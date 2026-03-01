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
        progress: {},       // { categoryId: { memorized: [...ids], needsReview: [...ids] } }
        isFlipped: false,
        firestore: null
    };

    // --- DOM要素キャッシュ ---
    const el = {
        screens: {
            login: document.getElementById('login-screen'),
            home: document.getElementById('home-screen'),
            study: document.getElementById('study-screen'),
            complete: document.getElementById('complete-screen')
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

        // Firebase初期化
        await initFirebase();

        // 進捗読み込み
        await loadProgress();

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

        // カテゴリグリッド構築
        el.home.categoryGrid.innerHTML = '';

        Object.entries(CATEGORIES).forEach(([catId, cat]) => {
            const catItems = VOCABULARY_DATA.filter(v => v.category === catId);
            const progress = state.progress[catId] || { memorized: [], needsReview: [] };
            const memCount = progress.memorized ? progress.memorized.length : 0;
            const pct = catItems.length > 0 ? Math.round((memCount / catItems.length) * 100) : 0;

            totalMem += memCount;
            totalRev += progress.needsReview ? progress.needsReview.length : 0;

            const card = document.createElement('div');
            card.className = 'category-card';
            card.onclick = () => startStudy(catId);
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
