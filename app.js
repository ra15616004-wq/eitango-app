// ============================
// UK英語フラッシュカードアプリ - メインロジック
// ============================

(function () {
    'use strict';

    // --- 状態管理 ---
    const state = {
        userId: null,
        currentCategory: null,
        currentCards: [],
        currentIndex: 0,
        sessionMemorized: [],
        sessionReview: [],
        progress: {},
        isFlipped: false,
        firestore: null,
        // リスニングモード用
        mode: 'flashcard',  // 'flashcard' or 'listening'
        listeningQuestions: [],
        listeningIndex: 0,
        listeningCorrect: 0,
        listeningWrong: 0,
        listeningAnswered: false
    };

    // --- DOM要素キャッシュ ---
    const el = {
        screens: {
            login: document.getElementById('login-screen'),
            home: document.getElementById('home-screen'),
            study: document.getElementById('study-screen'),
            complete: document.getElementById('complete-screen'),
            listening: document.getElementById('listening-screen'),
            listeningComplete: document.getElementById('listening-complete-screen')
        },
        login: {
            input: document.getElementById('user-id-input'),
            btn: document.getElementById('login-btn')
        },
        home: {
            userName: document.getElementById('header-user-name'),
            syncStatus: document.getElementById('sync-status'),
            totalMemorized: document.getElementById('total-memorized'),
            totalReview: document.getElementById('total-review'),
            totalRemaining: document.getElementById('total-remaining'),
            categoryGrid: document.getElementById('category-grid')
        },
        study: {
            categoryName: document.getElementById('study-category-name'),
            progressText: document.getElementById('study-progress-text'),
            progressFill: document.getElementById('study-progress-fill'),
            flashcard: document.getElementById('flashcard'),
            flashcardInner: document.getElementById('flashcard-inner'),
            frontText: document.getElementById('card-front-text'),
            backText: document.getElementById('card-back-text'),
            phonetics: document.getElementById('card-phonetics'),
            notes: document.getElementById('card-notes'),
            actionButtons: document.getElementById('action-buttons'),
            backBtn: document.getElementById('back-to-home-btn'),
            audioBtn: document.getElementById('audio-btn'),
            reviewBtn: document.getElementById('review-btn'),
            memorizedBtn: document.getElementById('memorized-btn')
        },
        complete: {
            categoryName: document.getElementById('complete-category-name'),
            memorized: document.getElementById('complete-memorized'),
            review: document.getElementById('complete-review'),
            message: document.getElementById('complete-message'),
            retryBtn: document.getElementById('retry-btn'),
            homeBtn: document.getElementById('home-btn')
        },
        logoutBtn: document.getElementById('logout-btn')
    };

    // ============================
    // 画面遷移管理
    // ============================
    function showScreen(screenName) {
        Object.values(el.screens).forEach(s => s.classList.remove('active'));
        el.screens[screenName].classList.add('active');
    }

    // ============================
    // トースト通知
    // ============================
    function showToast(message) {
        let toast = document.querySelector('.toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'toast';
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2500);
    }

    // ============================
    // Firebase / ローカルストレージ管理
    // ============================
    async function initFirebase() {
        if (!isFirebaseConfigured) {
            console.log('[eitango] Firebase未設定 → ローカルモードで動作します');
            updateSyncStatus(false);
            return false;
        }

        try {
            // Firebase SDKを動的に読み込み
            await loadScript('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
            await loadScript('https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore-compat.js');

            const app = firebase.initializeApp(firebaseConfig);
            state.firestore = firebase.firestore();
            console.log('[eitango] Firebase接続成功');
            updateSyncStatus(true);
            return true;
        } catch (err) {
            console.error('[eitango] Firebase初期化エラー:', err);
            updateSyncStatus(false);
            return false;
        }
    }

    function loadScript(src) {
        return new Promise((resolve, reject) => {
            if (document.querySelector(`script[src="${src}"]`)) {
                resolve();
                return;
            }
            const s = document.createElement('script');
            s.src = src;
            s.onload = resolve;
            s.onerror = reject;
            document.head.appendChild(s);
        });
    }

    function updateSyncStatus(connected) {
        const statusEl = el.home.syncStatus;
        if (connected) {
            statusEl.classList.add('connected');
            statusEl.querySelector('.sync-text').textContent = 'Cloud同期';
        } else {
            statusEl.classList.remove('connected');
            statusEl.querySelector('.sync-text').textContent = 'ローカル';
        }
    }

    // --- 進捗データの読み込み ---
    async function loadProgress() {
        // Firestoreから読み込み試行
        if (state.firestore && state.userId) {
            try {
                const doc = await state.firestore.collection('users').doc(state.userId).get();
                if (doc.exists && doc.data().progress) {
                    state.progress = doc.data().progress;
                    console.log('[eitango] Firestoreから進捗データを読み込みました');
                    // ローカルにもバックアップ保存
                    saveProgressLocal();
                    return;
                }
            } catch (err) {
                console.error('[eitango] Firestore読み込みエラー:', err);
            }
        }

        // ローカルストレージから読み込み
        const saved = localStorage.getItem(`eitango_progress_${state.userId}`);
        if (saved) {
            try {
                state.progress = JSON.parse(saved);
                console.log('[eitango] ローカルから進捗データを読み込みました');
            } catch (e) {
                state.progress = {};
            }
        }
    }

    // --- 進捗データの保存 ---
    async function saveProgress() {
        // ローカルに保存
        saveProgressLocal();

        // Firestoreに保存
        if (state.firestore && state.userId) {
            try {
                await state.firestore.collection('users').doc(state.userId).set({
                    progress: state.progress,
                    lastUpdated: new Date()
                }, { merge: true });
                console.log('[eitango] Firestoreに保存しました');
            } catch (err) {
                console.error('[eitango] Firestore保存エラー:', err);
                showToast('⚠️ クラウド同期に失敗しました（ローカルには保存済）');
            }
        }
    }

    function saveProgressLocal() {
        try {
            localStorage.setItem(`eitango_progress_${state.userId}`, JSON.stringify(state.progress));
        } catch (e) {
            console.error('[eitango] ローカル保存エラー:', e);
        }
    }

    // --- Firestoreリアルタイム同期 ---
    function startRealtimeSync() {
        if (!state.firestore || !state.userId) return;

        try {
            state.firestore.collection('users').doc(state.userId).onSnapshot((doc) => {
                if (doc.exists && doc.data().progress) {
                    state.progress = doc.data().progress;
                    saveProgressLocal();
                    updateDashboard();
                    console.log('[eitango] リアルタイム同期を受信しました');
                }
            });
        } catch (err) {
            console.error('[eitango] リアルタイム同期エラー:', err);
        }
    }

    // ============================
    // ログイン
    // ============================
    async function handleLogin() {
        const userId = el.login.input.value.trim();
        if (!userId) {
            showToast('ユーザーIDを入力してください');
            el.login.input.focus();
            return;
        }

        state.userId = userId;
        el.home.userName.textContent = `ID: ${userId}`;

        try {
            // Firebase初期化
            await initFirebase();
        } catch (e) {
            console.warn('[eitango] Firebase初期化スキップ:', e);
        }

        try {
            // 進捗読み込み
            await loadProgress();
        } catch (e) {
            console.warn('[eitango] 進捗読み込みスキップ:', e);
        }

        // リアルタイム同期開始
        startRealtimeSync();

        // ダッシュボード更新
        updateDashboard();

        // 画面切替
        showScreen('home');
        showToast(`ようこそ、${userId}さん！`);

        // セッション保存
        sessionStorage.setItem('eitango_userId', userId);
    }

    // ============================
    // ダッシュボード
    // ============================
    function updateDashboard() {
        let totalMem = 0, totalRev = 0, totalAll = VOCABULARY_DATA.length;
        const isListening = state.mode === 'listening';

        // セクションタイトル更新
        const titleEl = document.getElementById('section-title-text');
        if (titleEl) titleEl.textContent = isListening ? 'カテゴリを選んでリスニング' : 'カテゴリを選んで学習';

        // カテゴリグリッド構築
        el.home.categoryGrid.innerHTML = '';

        Object.entries(CATEGORIES).forEach(([catId, cat]) => {
            const catItems = VOCABULARY_DATA.filter(v => v.category === catId);
            const progress = state.progress[catId] || { memorized: [], needsReview: [] };
            const memCount = progress.memorized ? progress.memorized.length : 0;
            const pct = catItems.length > 0 ? Math.round((memCount / catItems.length) * 100) : 0;

            totalMem += memCount;
            totalRev += progress.needsReview ? progress.needsReview.length : 0;

            // リスニングモードの場合はリスニングデータの問題数を表示
            const lsData = typeof LISTENING_DATA !== "undefined" ? LISTENING_DATA.filter(q => q.category === catId) : [];
            const lsCount = lsData.length;

            const card = document.createElement('div');
            card.className = 'category-card';
            card.onclick = () => isListening ? startListening(catId) : startStudy(catId);

            if (isListening) {
                card.innerHTML = `
          <div class="category-icon" style="background: ${cat.color}15; color: ${cat.color};">
            ${cat.icon}
          </div>
          <div class="category-info">
            <div class="category-name">${cat.nameJa}</div>
            <div class="category-name-en">${cat.name}</div>
            <div class="category-stats">
              <span class="category-progress-text">🎧 ${lsCount}問</span>
            </div>
          </div>
        `;
            } else {
                card.innerHTML = `
          <div class="category-icon" style="background: ${cat.color}15; color: ${cat.color};">
            ${cat.icon}
          </div>
          <div class="category-info">
            <div class="category-name">${cat.nameJa}</div>
            <div class="category-name-en">${cat.name}</div>
            <div class="category-stats">
              <div class="category-progress-bar">
                <div class="category-progress-fill" style="width: ${pct}%"></div>
              </div>
              <span class="category-progress-text">${memCount}/${catItems.length}</span>
            </div>
          </div>
        `;
            }
            el.home.categoryGrid.appendChild(card);
        });

        // サマリー更新
        el.home.totalMemorized.textContent = totalMem;
        el.home.totalReview.textContent = totalRev;
        el.home.totalRemaining.textContent = totalAll - totalMem;
    }

    // ============================
    // 学習セッション
    // ============================
    function startStudy(categoryId) {
        state.currentCategory = categoryId;
        const cat = CATEGORIES[categoryId];
        const catItems = VOCABULARY_DATA.filter(v => v.category === categoryId);

        // 復習カードを優先的に出す
        const progress = state.progress[categoryId] || { memorized: [], needsReview: [] };
        const reviewIds = progress.needsReview || [];
        const memorizedIds = progress.memorized || [];

        // 未学習カード + 復習カードをシャッフル
        const unlearned = catItems.filter(c => !memorizedIds.includes(c.id) && !reviewIds.includes(c.id));
        const review = catItems.filter(c => reviewIds.includes(c.id));
        state.currentCards = shuffleArray([...review, ...unlearned]);
        state.currentIndex = 0;
        state.sessionMemorized = [];
        state.sessionReview = [];
        state.isFlipped = false;

        if (state.currentCards.length === 0) {
            // 全て覚えた場合は全カードで再テスト
            state.currentCards = shuffleArray([...catItems]);
        }

        // UI更新
        el.study.categoryName.textContent = `${cat.icon} ${cat.nameJa}`;
        showCard();
        showScreen('study');
    }

    function showCard() {
        const card = state.currentCards[state.currentIndex];
        if (!card) return;

        // カードをリセット（裏返す前の状態に）
        state.isFlipped = false;
        el.study.flashcard.classList.remove('flipped');
        el.study.actionButtons.classList.remove('visible');

        // テキスト設定
        el.study.frontText.textContent = card.front;
        el.study.backText.textContent = card.back;
        el.study.phonetics.textContent = card.phonetics;
        el.study.notes.textContent = card.notes;

        // 進捗表示
        const total = state.currentCards.length;
        const current = state.currentIndex + 1;
        el.study.progressText.textContent = `${current} / ${total}`;
        el.study.progressFill.style.width = `${(current / total) * 100}%`;
    }

    function flipCard() {
        state.isFlipped = !state.isFlipped;
        el.study.flashcard.classList.toggle('flipped', state.isFlipped);

        // カードが裏面の時だけアクションボタンを表示
        if (state.isFlipped) {
            el.study.actionButtons.classList.add('visible');
        } else {
            el.study.actionButtons.classList.remove('visible');
        }
    }

    function markCard(memorized) {
        const card = state.currentCards[state.currentIndex];
        if (!card) return;

        // セッション結果に追加
        if (memorized) {
            state.sessionMemorized.push(card.id);
        } else {
            state.sessionReview.push(card.id);
        }

        // 進捗データ更新
        if (!state.progress[state.currentCategory]) {
            state.progress[state.currentCategory] = { memorized: [], needsReview: [] };
        }

        const prog = state.progress[state.currentCategory];
        if (memorized) {
            if (!prog.memorized.includes(card.id)) prog.memorized.push(card.id);
            prog.needsReview = prog.needsReview.filter(id => id !== card.id);
        } else {
            if (!prog.needsReview.includes(card.id)) prog.needsReview.push(card.id);
            prog.memorized = prog.memorized.filter(id => id !== card.id);
        }

        // 次のカードへ
        state.currentIndex++;
        if (state.currentIndex >= state.currentCards.length) {
            completeSession();
        } else {
            showCard();
        }

        // 進捗保存（非同期で適宜保存）
        saveProgress();
    }

    // ============================
    // セッション完了
    // ============================
    function completeSession() {
        const cat = CATEGORIES[state.currentCategory];
        const memCount = state.sessionMemorized.length;
        const revCount = state.sessionReview.length;
        const total = memCount + revCount;

        el.complete.categoryName.textContent = `${cat.icon} ${cat.nameJa}`;
        el.complete.memorized.textContent = memCount;
        el.complete.review.textContent = revCount;

        // メッセージ判定
        const pct = total > 0 ? Math.round((memCount / total) * 100) : 0;
        let msg;
        if (pct === 100) msg = '🎉 パーフェクト！全て覚えましたね！素晴らしい！';
        else if (pct >= 80) msg = '💪 素晴らしい成果です！あと少しで完全制覇！';
        else if (pct >= 60) msg = '👍 いい調子です！復習を繰り返して定着させましょう。';
        else if (pct >= 40) msg = '📖 まだまだこれから！繰り返し学習が大切です。';
        else msg = '🔄 復習モードでもう一度チャレンジしてみましょう！';
        el.complete.message.textContent = msg;

        showScreen('complete');
    }

    // ============================
    // 音声再生（Web Speech API）
    // ============================
    function playAudio() {
        const card = state.currentCards[state.currentIndex];
        if (!card) return;

        if (!('speechSynthesis' in window)) {
            showToast('⚠️ このブラウザは音声再生に対応していません');
            return;
        }

        // 既存の発話をキャンセル
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(card.back);
        utterance.lang = 'en-GB';
        utterance.rate = 0.85;
        utterance.pitch = 1.0;

        // en-GBの音声を優先選択
        const voices = window.speechSynthesis.getVoices();
        const gbVoice = voices.find(v => v.lang === 'en-GB') || voices.find(v => v.lang.startsWith('en'));
        if (gbVoice) utterance.voice = gbVoice;

        window.speechSynthesis.speak(utterance);
    }

    // ============================
    // リスニングモード
    // ============================
    function startListening(categoryId) {
        state.currentCategory = categoryId;
        const cat = CATEGORIES[categoryId];
        const questions = typeof LISTENING_DATA !== "undefined" ? LISTENING_DATA.filter(q => q.category === categoryId) : [];

        if (questions.length === 0) {
            showToast('このカテゴリにはリスニング問題がありません');
            return;
        }

        state.listeningQuestions = shuffleArray([...questions]);
        state.listeningIndex = 0;
        state.listeningCorrect = 0;
        state.listeningWrong = 0;

        document.getElementById('listening-category-name').textContent = `🎧 ${cat.nameJa}`;
        showListeningQuestion();
        showScreen('listening');
    }

    function showListeningQuestion() {
        const q = state.listeningQuestions[state.listeningIndex];
        if (!q) return;

        state.listeningAnswered = false;
        state.listeningAudioPlayed = false;

        // 場面表示
        document.getElementById('situation-text').textContent = q.situation;

        // プログレス更新
        const total = state.listeningQuestions.length;
        const current = state.listeningIndex + 1;
        document.getElementById('listening-progress-text').textContent = `${current} / ${total}`;
        document.getElementById('listening-progress-fill').style.width = `${(current / total) * 100}%`;

        // 結果エリアを非表示
        document.getElementById('listening-result').style.display = 'none';

        // 選択肢を事前に準備しておくが、まだ表示しない
        const choices = shuffleArray(q.options);
        state.listeningChoices = choices;
        state.listeningQuestionItem = q; // 現在の質問データ

        // 選択肢エリアを非表示にする
        const choicesArea = document.getElementById('choices-area');
        choicesArea.innerHTML = '';
        choicesArea.style.display = 'none';

        // 「音声を聴く」ボタンを再表示
        document.querySelector('.listening-audio-area').style.display = 'block';
        document.querySelector('.listening-hint').textContent = '🎧 英語を聴いて、適切な返答を選びましょう！';
    }

    function handleListeningAnswer(clickedBtn, isCorrect, qItem, choicesArea) {
        if (state.listeningAnswered) return;
        state.listeningAnswered = true;

        // 全ボタンを無効化
        Array.from(choicesArea.children).forEach(btn => {
            btn.classList.add('disabled');
        });

        const correctOpt = qItem.options.find(o => o.isCorrect);

        if (isCorrect) {
            clickedBtn.classList.add('correct');
            state.listeningCorrect++;
            document.getElementById('result-icon').textContent = '🎉';
        } else {
            clickedBtn.classList.add('wrong');
            state.listeningWrong++;
            document.getElementById('result-icon').textContent = '😢';
            // 正解のボタンをハイライト
            Array.from(choicesArea.children).forEach(btn => {
                if (btn.textContent === correctOpt.text) btn.classList.add('correct');
            });
        }

        // 結果表示
        document.getElementById('result-english').textContent = correctOpt.text;
        document.getElementById('result-phonetics').textContent = '🎧 聞き取り: ' + qItem.audioPhrase;
        document.getElementById('result-notes').textContent = qItem.explanation;

        setTimeout(() => {
            choicesArea.style.display = 'none';
            document.getElementById('listening-result').style.display = 'block';
            // 正解音声を再生
            playTextAudio(correctOpt.text);
        }, 600);
    }

    function nextListeningQuestion() {
        state.listeningIndex++;
        if (state.listeningIndex >= state.listeningQuestions.length) {
            completeListening();
        } else {
            showListeningQuestion();
        }
    }

    function completeListening() {
        const cat = CATEGORIES[state.currentCategory];
        const correct = state.listeningCorrect;
        const wrong = state.listeningWrong;
        const total = correct + wrong;

        document.getElementById('listening-complete-category').textContent = `🎧 ${cat.nameJa}`;
        document.getElementById('listening-complete-correct').textContent = correct;
        document.getElementById('listening-complete-wrong').textContent = wrong;

        const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
        let msg;
        if (pct === 100) msg = '🎉 パーフェクト！リスニング力バッチリです！';
        else if (pct >= 80) msg = '👏 素晴らしい！ほとんど聞き取れていますね！';
        else if (pct >= 60) msg = '👍 いい感じ！繰り返し聴いて耳を慣らしましょう。';
        else msg = '🔄 もう一度チャレンジして、イギリス英語の音に慣れましょう！';
        document.getElementById('listening-complete-message').textContent = msg;

        showScreen('listeningComplete');
    }

    function playTextAudio(text) {
        if (!('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-GB';
        utterance.rate = 0.85;
        const voices = window.speechSynthesis.getVoices();
        const gbVoice = voices.find(v => v.lang === 'en-GB') || voices.find(v => v.lang.startsWith('en'));
        if (gbVoice) utterance.voice = gbVoice;
        window.speechSynthesis.speak(utterance);
    }

    function playListeningAudio() {
        const q = state.listeningQuestions[state.listeningIndex];
        if (!q) return;

        const btn = document.getElementById('listening-play-btn');
        btn.classList.add('playing');
        playTextAudio(q.audioPhrase);

        setTimeout(() => btn.classList.remove('playing'), 2000);

        // 音声を聴いた後に選択肢を表示
        if (!state.listeningAudioPlayed) {
            state.listeningAudioPlayed = true;
            document.querySelector('.listening-hint').textContent = 'あなたならどう答えますか？';

            setTimeout(() => {
                const choicesArea = document.getElementById('choices-area');
                choicesArea.innerHTML = '';
                choicesArea.style.display = 'flex';

                state.listeningChoices.forEach(choice => {
                    const btn = document.createElement('button');
                    btn.className = 'choice-btn';
                    btn.textContent = choice.text;
                    btn.onclick = () => handleListeningAnswer(btn, choice.isCorrect, state.listeningQuestionItem, choicesArea);
                    choicesArea.appendChild(btn);
                });
            }, 500);
        }
    }

    // ============================
    // ユーティリティ
    // ============================
    function shuffleArray(arr) {
        const shuffled = [...arr];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    // ============================
    // イベントリスナー
    // ============================
    function setupEventListeners() {
        // ログイン
        el.login.btn.addEventListener('click', handleLogin);
        el.login.input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') handleLogin();
        });

        // ログアウト
        el.logoutBtn.addEventListener('click', () => {
            state.userId = null;
            state.progress = {};
            sessionStorage.removeItem('eitango_userId');
            el.login.input.value = '';
            showScreen('login');
            showToast('ログアウトしました');
        });

        // フラッシュカード
        el.study.flashcard.addEventListener('click', flipCard);

        // アクションボタン
        el.study.reviewBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            markCard(false);
        });
        el.study.memorizedBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            markCard(true);
        });

        // 音声再生
        el.study.audioBtn.addEventListener('click', playAudio);

        // 戻るボタン
        el.study.backBtn.addEventListener('click', () => {
            updateDashboard();
            showScreen('home');
        });

        // 完了画面ボタン
        el.complete.retryBtn.addEventListener('click', () => {
            startStudy(state.currentCategory);
        });
        el.complete.homeBtn.addEventListener('click', () => {
            updateDashboard();
            showScreen('home');
        });

        // --- モード切替 ---
        const modeFlashcardBtn = document.getElementById('mode-flashcard-btn');
        const modeListeningBtn = document.getElementById('mode-listening-btn');
        if (modeFlashcardBtn && modeListeningBtn) {
            modeFlashcardBtn.addEventListener('click', () => {
                state.mode = 'flashcard';
                modeFlashcardBtn.classList.add('active');
                modeListeningBtn.classList.remove('active');
                updateDashboard();
            });
            modeListeningBtn.addEventListener('click', () => {
                state.mode = 'listening';
                modeListeningBtn.classList.add('active');
                modeFlashcardBtn.classList.remove('active');
                updateDashboard();
            });
        }

        // --- リスニング画面イベント ---
        const listeningBackBtn = document.getElementById('listening-back-btn');
        if (listeningBackBtn) {
            listeningBackBtn.addEventListener('click', () => {
                updateDashboard();
                showScreen('home');
            });
        }

        const listeningPlayBtn = document.getElementById('listening-play-btn');
        if (listeningPlayBtn) {
            listeningPlayBtn.addEventListener('click', playListeningAudio);
        }

        const listeningNextBtn = document.getElementById('listening-next-btn');
        if (listeningNextBtn) {
            listeningNextBtn.addEventListener('click', nextListeningQuestion);
        }

        // リスニング完了画面
        const listeningRetryBtn = document.getElementById('listening-retry-btn');
        if (listeningRetryBtn) {
            listeningRetryBtn.addEventListener('click', () => startListening(state.currentCategory));
        }
        const listeningHomeBtn = document.getElementById('listening-home-btn');
        if (listeningHomeBtn) {
            listeningHomeBtn.addEventListener('click', () => {
                updateDashboard();
                showScreen('home');
            });
        }

        // キーボードショートカット
        document.addEventListener('keydown', (e) => {
            // 学習画面でのみ有効
            if (!el.screens.study.classList.contains('active')) return;

            switch (e.key) {
                case ' ':
                case 'Enter':
                    e.preventDefault();
                    flipCard();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    if (state.isFlipped) markCard(false);
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    if (state.isFlipped) markCard(true);
                    break;
            }
        });

        // 音声リスト読み込み（一部ブラウザで非同期）
        if ('speechSynthesis' in window) {
            window.speechSynthesis.onvoiceschanged = () => {
                window.speechSynthesis.getVoices();
            };
        }
    }

    // ============================
    // 初期化
    // ============================
    function init() {
        setupEventListeners();

        // セッション復元
        const savedUserId = sessionStorage.getItem('eitango_userId');
        if (savedUserId) {
            el.login.input.value = savedUserId;
            // 自動ログインは行わず、ボタン押下を待つ
        }

        console.log('[eitango] UK English Flashcards アプリを初期化しました');
        console.log(`[eitango] 単語数: ${VOCABULARY_DATA.length} / カテゴリ数: ${Object.keys(CATEGORIES).length}`);
    }

    // DOM読み込み完了後に初期化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
