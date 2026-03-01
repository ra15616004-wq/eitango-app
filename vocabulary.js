// UK英語ボキャブラリーデータセット
// カテゴリ: Airport/Immigration, Hotel, Pub/Restaurant, Tube/Transport, Shopping, Emergencies

const VOCABULARY_DATA = [
  // ============================
  // カテゴリ1: Airport / Immigration（空港・入国審査）
  // ============================
  { id: "airport_001", category: "airport", front: "列に並んでください", back: "Please join the queue.", phonetics: "プリーズ ジョイン ザ キュー", notes: "queue（キュー）= 列。アメリカ英語の line に相当するイギリス英語。" },
  { id: "airport_002", category: "airport", front: "手荷物受取所はどこですか？", back: "Where is the baggage reclaim?", phonetics: "ウェア イズ ザ バゲッジ リクレイム", notes: "reclaim はイギリス英語。アメリカ英語では baggage claim。" },
  { id: "airport_003", category: "airport", front: "申告するものはありますか？", back: "Do you have anything to declare?", phonetics: "ドゥ ユー ハヴ エニシング トゥ ディクレア", notes: "税関で必ず聞かれる質問。Nothing to declare と答えるのが一般的。" },
  { id: "airport_004", category: "airport", front: "滞在目的は何ですか？", back: "What is the purpose of your visit?", phonetics: "ワット イズ ザ パーパス オブ ユア ヴィジット", notes: "入国審査で最もよく聞かれる質問。Holiday / Sightseeing と答える。" },
  { id: "airport_005", category: "airport", front: "帰りの航空券を見せてください", back: "May I see your return ticket?", phonetics: "メイ アイ シー ユア リターン チケット", notes: "return ticket = 往復券。イギリス英語特有の表現。アメリカでは round-trip ticket。" },
  { id: "airport_006", category: "airport", front: "どのくらい滞在する予定ですか？", back: "How long do you intend to stay?", phonetics: "ハウ ロング ドゥ ユー インテンド トゥ ステイ", notes: "intend to = ～するつもりだ。丁寧な言い回し。" },
  { id: "airport_007", category: "airport", front: "トロリーを借りてもいいですか？", back: "May I use a trolley?", phonetics: "メイ アイ ユーズ ア トロリー", notes: "trolley = カート。アメリカ英語では cart。空港やスーパーで使う。" },
  { id: "airport_008", category: "airport", front: "乗り継ぎ便に乗り遅れそうです", back: "I'm about to miss my connecting flight.", phonetics: "アイム アバウト トゥ ミス マイ コネクティング フライト", notes: "connecting flight = 乗り継ぎ便。遅延時にスタッフに伝える表現。" },
  { id: "airport_009", category: "airport", front: "パスポートコントロールはどちらですか？", back: "Where is passport control?", phonetics: "ウェア イズ パスポート コントロール", notes: "イギリスの空港では immigration よりも passport control の表示が一般的。" },
  { id: "airport_010", category: "airport", front: "荷物が出てきません", back: "My luggage hasn't come through.", phonetics: "マイ ラゲッジ ハズント カム スルー", notes: "come through = 出てくる。ロストバゲージの際の最初の一言。" },
  { id: "airport_011", category: "airport", front: "出発ロビーはどの階ですか？", back: "Which floor is the departure lounge on?", phonetics: "ウィッチ フロア イズ ザ ディパーチャ ラウンジ オン", notes: "departure lounge = 出発ロビー。イギリスの空港でよく使う表現。" },
  { id: "airport_012", category: "airport", front: "搭乗口が変更になりました", back: "The boarding gate has been changed.", phonetics: "ザ ボーディング ゲイト ハズ ビーン チェインジド", notes: "電光掲示板で確認。アナウンスでもよく流れる表現。" },
  { id: "airport_013", category: "airport", front: "両替所はどこですか？", back: "Where is the bureau de change?", phonetics: "ウェア イズ ザ ビューロー デ シャンジ", notes: "bureau de change = 両替所。フランス語由来でイギリスで一般的に使用。" },
  { id: "airport_014", category: "airport", front: "制限エリアを超えています", back: "You're past the restricted area.", phonetics: "ユア パスト ザ リストリクティド エリア", notes: "空港セキュリティで使われる表現。" },
  { id: "airport_015", category: "airport", front: "液体物は別にしてください", back: "Please separate your liquids.", phonetics: "プリーズ セパレイト ユア リキッズ", notes: "セキュリティチェックでの指示。100ml以下の容器をジップロックに。" },
  { id: "airport_016", category: "airport", front: "ベルトと靴を外してください", back: "Please remove your belt and shoes.", phonetics: "プリーズ リムーヴ ユア ベルト アンド シューズ", notes: "セキュリティでの指示。イギリスの空港では靴を脱ぐ場合もある。" },
  { id: "airport_017", category: "airport", front: "預け入れ荷物の重量制限は何キロですか？", back: "What is the baggage allowance?", phonetics: "ワット イズ ザ バゲッジ アラウアンス", notes: "baggage allowance = 手荷物許容量。weight limit よりも一般的。" },
  { id: "airport_018", category: "airport", front: "超過料金はいくらですか？", back: "How much is the excess baggage charge?", phonetics: "ハウ マッチ イズ ジ エクセス バゲッジ チャージ", notes: "excess baggage = 超過荷物。chargeはイギリスでよく使う「料金」の表現。" },
  { id: "airport_019", category: "airport", front: "機内持ち込み手荷物だけです", back: "I only have hand luggage.", phonetics: "アイ オンリー ハヴ ハンド ラゲッジ", notes: "hand luggage = 機内持ち込み荷物。アメリカでは carry-on。" },
  { id: "airport_020", category: "airport", front: "ヒースロー・エクスプレスの乗り場はどこですか？", back: "Where do I catch the Heathrow Express?", phonetics: "ウェア ドゥ アイ キャッチ ザ ヒースロー エクスプレス", notes: "catch = （電車に）乗る。イギリスでは take より catch が一般的。" },
  { id: "airport_021", category: "airport", front: "入国カードを記入してください", back: "Please fill in the landing card.", phonetics: "プリーズ フィル イン ザ ランディング カード", notes: "landing card = 入国カード。イギリス英語特有の表現。" },
  { id: "airport_022", category: "airport", front: "税関を通ってください", back: "Please go through customs.", phonetics: "プリーズ ゴー スルー カスタムズ", notes: "customs = 税関。常に複数形で使う。" },
  { id: "airport_023", category: "airport", front: "チェックインカウンターはどこですか？", back: "Where is the check-in desk?", phonetics: "ウェア イズ ザ チェックイン デスク", notes: "desk はイギリス英語。アメリカでは counter が一般的。" },
  { id: "airport_024", category: "airport", front: "窓側の席をお願いします", back: "Could I have a window seat, please?", phonetics: "クッド アイ ハヴ ア ウィンドウ シート プリーズ", notes: "Could I have ~ はイギリスで最も丁寧な依頼表現の一つ。" },
  { id: "airport_025", category: "airport", front: "フライトが遅延しています", back: "The flight has been delayed.", phonetics: "ザ フライト ハズ ビーン ディレイド", notes: "delayed = 遅延。cancelled（欠航）と合わせて覚える。" },

  // ============================
  // カテゴリ2: Hotel（ホテル）
  // ============================
  { id: "hotel_001", category: "hotel", front: "予約をしているのですが", back: "I have a booking, please.", phonetics: "アイ ハヴ ア ブッキング プリーズ", notes: "booking = 予約。アメリカの reservation よりイギリスではこちらが一般的。" },
  { id: "hotel_002", category: "hotel", front: "バス・トイレ付きの部屋はありますか？", back: "Do you have a room with an en suite?", phonetics: "ドゥ ユー ハヴ ア ルーム ウィズ アン オンスイート", notes: "en suite = バス・トイレ付き。フランス語由来のイギリス英語。" },
  { id: "hotel_003", category: "hotel", front: "フロントに鍵を預けてもいいですか？", back: "May I leave my key at reception?", phonetics: "メイ アイ リーヴ マイ キー アット リセプション", notes: "reception = フロントデスク。イギリスのホテルではこちらが標準。" },
  { id: "hotel_004", category: "hotel", front: "イングリッシュ・ブレックファストをお願いします", back: "I'd like a full English, please.", phonetics: "アイドゥ ライク ア フル イングリッシュ プリーズ", notes: "full English = 卵、ベーコン、ソーセージ、トースト等のイギリス式朝食。" },
  { id: "hotel_005", category: "hotel", front: "お湯が出ません", back: "There's no hot water.", phonetics: "ゼアズ ノー ホット ウォーター", notes: "ホテルのトラブル時に使う。直接的で問題ない表現。" },
  { id: "hotel_006", category: "hotel", front: "荷物を預かってもらえますか？", back: "Could you keep my luggage, please?", phonetics: "クッジュー キープ マイ ラゲッジ プリーズ", notes: "チェックアウト後に荷物を預ける時の丁寧な表現。" },
  { id: "hotel_007", category: "hotel", front: "エレベーターはどこですか？", back: "Where is the lift?", phonetics: "ウェア イズ ザ リフト", notes: "lift = エレベーター。イギリス英語の代表的な単語。アメリカでは elevator。" },
  { id: "hotel_008", category: "hotel", front: "1階はどこですか？", back: "Where is the ground floor?", phonetics: "ウェア イズ ザ グラウンド フロア", notes: "ground floor = 1階。イギリスでは first floor は日本の2階に相当。要注意。" },
  { id: "hotel_009", category: "hotel", front: "チェックアウトは何時ですか？", back: "What time is checkout?", phonetics: "ワット タイム イズ チェックアウト", notes: "通常11時が多い。late checkout（レイトチェックアウト）も可能な場合がある。" },
  { id: "hotel_010", category: "hotel", front: "タオルを追加でもらえますか？", back: "Could I have some extra towels, please?", phonetics: "クッド アイ ハヴ サム エクストラ タウエルズ プリーズ", notes: "Could I have ~で丁寧に依頼。please を付けるのがイギリス流。" },
  { id: "hotel_011", category: "hotel", front: "隣の部屋がうるさいです", back: "The room next door is quite noisy.", phonetics: "ザ ルーム ネクスト ドア イズ クワイト ノイジー", notes: "quite = かなり。イギリス英語では控えめな苦情表現としてよく使う。" },
  { id: "hotel_012", category: "hotel", front: "モーニングコールをお願いします", back: "Could I have an alarm call, please?", phonetics: "クッド アイ ハヴ アン アラーム コール プリーズ", notes: "alarm call = モーニングコール。wake-up call より英国的表現。" },
  { id: "hotel_013", category: "hotel", front: "電気ケトルはありますか？", back: "Is there a kettle in the room?", phonetics: "イズ ゼア ア ケトル イン ザ ルーム", notes: "kettle = 電気ケトル。イギリスのホテルにはほぼ必ず備え付けてある。" },
  { id: "hotel_014", category: "hotel", front: "Wi-Fiのパスワードを教えてください", back: "Could I have the Wi-Fi code, please?", phonetics: "クッド アイ ハヴ ザ ワイファイ コード プリーズ", notes: "code はイギリスでよく使う password の代替表現。" },
  { id: "hotel_015", category: "hotel", front: "部屋の掃除をお願いします", back: "Could I have my room tidied, please?", phonetics: "クッド アイ ハヴ マイ ルーム タイディド プリーズ", notes: "tidied = 片付ける・掃除する。cleaned よりイギリスらしい表現。" },
  { id: "hotel_016", category: "hotel", front: "コンセントの変換プラグはありますか？", back: "Do you have a plug adaptor?", phonetics: "ドゥ ユー ハヴ ア プラグ アダプター", notes: "イギリスは BFタイプ（3ピン）。adaptor はイギリス式スペル。" },
  { id: "hotel_017", category: "hotel", front: "ツインルームに変更できますか？", back: "Could I switch to a twin room?", phonetics: "クッド アイ スウィッチ トゥ ア ツイン ルーム", notes: "twin room = ツインルーム。double room = ダブルルーム。" },
  { id: "hotel_018", category: "hotel", front: "近くにおすすめのレストランはありますか？", back: "Can you recommend a restaurant nearby?", phonetics: "キャン ユー レコメンド ア レストラン ニアバイ", notes: "recommend = おすすめする。ホテルのスタッフに聞くと良い情報が得られる。" },
  { id: "hotel_019", category: "hotel", front: "クリーニングサービスはありますか？", back: "Do you offer a laundry service?", phonetics: "ドゥ ユー オファー ア ローンドリー サービス", notes: "laundry service = クリーニングサービス。offer はイギリスでよく使う。" },
  { id: "hotel_020", category: "hotel", front: "部屋にセーフティボックスはありますか？", back: "Is there a safe in the room?", phonetics: "イズ ゼア ア セイフ イン ザ ルーム", notes: "safe = 金庫。safety box よりも safe が一般的。" },
  { id: "hotel_021", category: "hotel", front: "チェックインをお願いします", back: "I'd like to check in, please.", phonetics: "アイドゥ ライク トゥ チェックイン プリーズ", notes: "I'd like to ~ = ～したいのですが。丁寧な依頼表現。" },
  { id: "hotel_022", category: "hotel", front: "朝食は何時からですか？", back: "What time does breakfast start?", phonetics: "ワット タイム ダズ ブレックファスト スタート", notes: "イギリスのホテルでは通常7:00-9:30。Full English が名物。" },
  { id: "hotel_023", category: "hotel", front: "請求書をもらえますか？", back: "Could I have the bill, please?", phonetics: "クッド アイ ハヴ ザ ビル プリーズ", notes: "bill = 請求書・勘定。アメリカの check に相当するイギリス英語。" },
  { id: "hotel_024", category: "hotel", front: "暖房が効きません", back: "The heating isn't working.", phonetics: "ザ ヒーティング イズント ワーキング", notes: "heating = 暖房。イギリスは寒いので重要な表現。" },
  { id: "hotel_025", category: "hotel", front: "延泊できますか？", back: "Could I extend my stay?", phonetics: "クッド アイ エクステンド マイ ステイ", notes: "extend = 延長する。availability（空室状況）次第。" },

  // ============================
  // カテゴリ3: Pub / Restaurant（パブ・レストラン）
  // ============================
  { id: "pub_001", category: "pub", front: "お会計をお願いします", back: "Could I have the bill, please?", phonetics: "クッド アイ ハヴ ザ ビル プリーズ", notes: "bill = 勘定書。アメリカの check に相当。イギリスでは必ず bill。" },
  { id: "pub_002", category: "pub", front: "前菜は何がありますか？", back: "What starters do you have?", phonetics: "ワット スターターズ ドゥ ユー ハヴ", notes: "starter = 前菜。アメリカの appetizer に相当するイギリス英語。" },
  { id: "pub_003", category: "pub", front: "デザートを見せてください", back: "Could I see the pudding menu?", phonetics: "クッド アイ シー ザ プディング メニュー", notes: "pudding = デザート全般。イギリスではプリンだけでなくデザートの総称。" },
  { id: "pub_004", category: "pub", front: "炭酸飲料をください", back: "Could I have a fizzy drink, please?", phonetics: "クッド アイ ハヴ ア フィジー ドリンク プリーズ", notes: "fizzy drink = 炭酸飲料。アメリカの soda / pop に相当。" },
  { id: "pub_005", category: "pub", front: "パイント1杯ください", back: "A pint, please.", phonetics: "ア パイント プリーズ", notes: "pint = 約568ml。イギリスのパブでビールを注文する基本単位。" },
  { id: "pub_006", category: "pub", front: "ハーフパイントでお願いします", back: "A half, please.", phonetics: "ア ハーフ プリーズ", notes: "half = ハーフパイント（約284ml）。少量飲みたい時の注文方法。" },
  { id: "pub_007", category: "pub", front: "おすすめの地ビールはありますか？", back: "Do you have any local ales?", phonetics: "ドゥ ユー ハヴ エニー ローカル エイルズ", notes: "ale = エール（上面発酵ビール）。イギリスのパブ文化の中心。" },
  { id: "pub_008", category: "pub", front: "テイクアウトできますか？", back: "Can I get this as a takeaway?", phonetics: "キャン アイ ゲット ディス アズ ア テイクアウェイ", notes: "takeaway = テイクアウト。アメリカの to-go に相当するイギリス英語。" },
  { id: "pub_009", category: "pub", front: "フィッシュ＆チップスをください", back: "Fish and chips, please.", phonetics: "フィッシュ アンド チップス プリーズ", notes: "chips = フライドポテト。イギリス英語。アメリカの fries に相当。" },
  { id: "pub_010", category: "pub", front: "お水をいただけますか？", back: "Could I have some tap water, please?", phonetics: "クッド アイ ハヴ サム タップ ウォーター プリーズ", notes: "tap water = 水道水（無料）。still water（ミネラルウォーター）は有料。" },
  { id: "pub_011", category: "pub", front: "2名で予約したいのですが", back: "I'd like to book a table for two.", phonetics: "アイドゥ ライク トゥ ブック ア テイブル フォー トゥー", notes: "book = 予約する。reserve よりもイギリスでは一般的。" },
  { id: "pub_012", category: "pub", front: "サービス料は含まれていますか？", back: "Is service included?", phonetics: "イズ サービス インクルーディド", notes: "イギリスではチップ文化が薄い。service charge が含まれている場合が多い。" },
  { id: "pub_013", category: "pub", front: "ベジタリアン向けのメニューはありますか？", back: "Do you have any veggie options?", phonetics: "ドゥ ユー ハヴ エニー ヴェジー オプションズ", notes: "veggie = vegetarian のカジュアルな言い方。イギリスで一般的。" },
  { id: "pub_014", category: "pub", front: "メインディッシュは何がおすすめですか？", back: "What do you recommend for the main?", phonetics: "ワット ドゥ ユー レコメンド フォー ザ メイン", notes: "main = メインコース。main course を略した表現。" },
  { id: "pub_015", category: "pub", front: "サンデーローストはありますか？", back: "Do you do a Sunday roast?", phonetics: "ドゥ ユー ドゥー ア サンデー ロースト", notes: "Sunday roast = 日曜のロースト料理。イギリスの伝統的な日曜の昼食。" },
  { id: "pub_016", category: "pub", front: "別々に支払えますか？", back: "Can we pay separately?", phonetics: "キャン ウィー ペイ セパレイトリー", notes: "separately = 別々に。Going Dutch（割り勘）するときに使う。" },
  { id: "pub_017", category: "pub", front: "窓際の席はありますか？", back: "Could we have a table by the window?", phonetics: "クッド ウィー ハヴ ア テイブル バイ ザ ウィンドウ", notes: "by the window = 窓際に。丁寧に場所のリクエストをする表現。" },
  { id: "pub_018", category: "pub", front: "ラウンドは私が持ちます", back: "This round is on me.", phonetics: "ディス ラウンド イズ オン ミー", notes: "round = 全員分の1巡の注文。パブ文化で交代で奢る習慣。" },
  { id: "pub_019", category: "pub", front: "ジャケットポテトをください", back: "A jacket potato, please.", phonetics: "ア ジャケット ポテイトウ プリーズ", notes: "jacket potato = ベイクドポテト。イギリスのカフェやパブの定番軽食。" },
  { id: "pub_020", category: "pub", front: "コーヒーよりも紅茶をお願いします", back: "I'd rather have tea, please.", phonetics: "アイドゥ ラザー ハヴ ティー プリーズ", notes: "I'd rather = ～の方がいい。イギリスでは紅茶文化が根強い。" },
  { id: "pub_021", category: "pub", front: "ミルクと砂糖はお使いですか？", back: "Do you take milk and sugar?", phonetics: "ドゥ ユー テイク ミルク アンド シュガー", notes: "take = （紅茶に）入れる。How do you take your tea? が定番の聞き方。" },
  { id: "pub_022", category: "pub", front: "ラストオーダーです", back: "Last orders, please!", phonetics: "ラスト オーダーズ プリーズ", notes: "Last orders = ラストオーダー。パブの閉店前にバーテンダーが叫ぶ。" },
  { id: "pub_023", category: "pub", front: "屋外の席でもいいですか？", back: "Shall we sit in the beer garden?", phonetics: "シャル ウィー シット イン ザ ビア ガーデン", notes: "beer garden = パブの屋外席エリア。天気の良い日に人気。" },
  { id: "pub_024", category: "pub", front: "カードで支払えますか？", back: "Do you take card?", phonetics: "ドゥ ユー テイク カード", notes: "take card = カード対応。イギリスではContactless（非接触決済）も普及。" },
  { id: "pub_025", category: "pub", front: "持ち帰り用の箱をもらえますか？", back: "Could I have a doggy bag?", phonetics: "クッド アイ ハヴ ア ドギー バッグ", notes: "doggy bag = 残り物を持ち帰る袋。最近は普通に使う表現。" },
  { id: "pub_026", category: "pub", front: "スコーンにクロテッドクリームをつけてください", back: "Scones with clotted cream, please.", phonetics: "スコーンズ ウィズ クロテッド クリーム プリーズ", notes: "clotted cream = 濃厚なクリーム。アフタヌーンティーの必需品。" },
  { id: "pub_027", category: "pub", front: "ビネガーをかけますか？", back: "Would you like vinegar on that?", phonetics: "ウッジュー ライク ヴィネガー オン ザット", notes: "フィッシュ＆チップスにはモルトビネガーをかけるのがイギリス流。" },

  // ============================
  // カテゴリ4: Tube / Transport（地下鉄・交通）
  // ============================
  { id: "tube_001", category: "tube", front: "足元にご注意ください", back: "Mind the gap.", phonetics: "マインド ザ ギャップ", notes: "ロンドン地下鉄の最も有名なアナウンス。電車とホームの隙間に注意。" },
  { id: "tube_002", category: "tube", front: "オイスターカードにチャージしたいです", back: "I'd like to top up my Oyster card.", phonetics: "アイドゥ ライク トゥ トップ アップ マイ オイスター カード", notes: "top up = チャージする。イギリス英語特有。アメリカでは reload。" },
  { id: "tube_003", category: "tube", front: "往復切符を1枚ください", back: "A return ticket, please.", phonetics: "ア リターン チケット プリーズ", notes: "return = 往復。single = 片道。アメリカの round-trip / one-way に相当。" },
  { id: "tube_004", category: "tube", front: "片道切符をください", back: "A single, please.", phonetics: "ア シングル プリーズ", notes: "single = 片道切符。return（往復）とセットで覚える。" },
  { id: "tube_005", category: "tube", front: "次の電車は何分後ですか？", back: "How long till the next train?", phonetics: "ハウ ロング ティル ザ ネクスト トレイン", notes: "till = until のカジュアル形。イギリスの日常会話でよく使う。" },
  { id: "tube_006", category: "tube", front: "この路線はどこで乗り換えますか？", back: "Where do I change for this line?", phonetics: "ウェア ドゥ アイ チェインジ フォー ディス ライン", notes: "change = 乗り換える。transfer よりもイギリスでは一般的。" },
  { id: "tube_007", category: "tube", front: "ラウンドアバウトを直進してください", back: "Go straight on at the roundabout.", phonetics: "ゴー ストレイト オン アット ザ ラウンダバウト", notes: "roundabout = ロータリー交差点。イギリスに非常に多い。" },
  { id: "tube_008", category: "tube", front: "横断歩道で渡ってください", back: "Cross at the zebra crossing.", phonetics: "クロス アット ザ ゼブラ クロッシング", notes: "zebra crossing = 横断歩道。イギリスでは「ゼブラ」と発音。" },
  { id: "tube_009", category: "tube", front: "バス停はどこですか？", back: "Where is the bus stop?", phonetics: "ウェア イズ ザ バス ストップ", notes: "ロンドンの赤い2階建てバス（ダブルデッカー）に乗る時に使う。" },
  { id: "tube_010", category: "tube", front: "終電は何時ですか？", back: "What time is the last tube?", phonetics: "ワット タイム イズ ザ ラスト チューブ", notes: "tube = ロンドン地下鉄の通称。Underground が正式名称。" },
  { id: "tube_011", category: "tube", front: "タクシーを呼んでもらえますか？", back: "Could you call me a cab?", phonetics: "クッジュー コール ミー ア キャブ", notes: "cab = タクシー。ロンドンの黒いタクシーは Black cab と呼ばれる。" },
  { id: "tube_012", category: "tube", front: "ここで降ります", back: "I'd like to get off here, please.", phonetics: "アイドゥ ライク トゥ ゲット オフ ヒア プリーズ", notes: "get off = 降りる。バスやタクシーで目的地に着いた時に使う。" },
  { id: "tube_013", category: "tube", front: "歩道は右側を歩いてください", back: "Keep to the right on the pavement.", phonetics: "キープ トゥ ザ ライト オン ザ ペイヴメント", notes: "pavement = 歩道。アメリカの sidewalk に相当するイギリス英語。" },
  { id: "tube_014", category: "tube", front: "車のトランクに荷物を入れてください", back: "Put the bags in the boot.", phonetics: "プット ザ バッグズ イン ザ ブート", notes: "boot = トランク。アメリカの trunk に相当するイギリス英語。" },
  { id: "tube_015", category: "tube", front: "ガソリンスタンドはどこですか？", back: "Where is the nearest petrol station?", phonetics: "ウェア イズ ザ ニアレスト ペトロル ステイション", notes: "petrol = ガソリン。アメリカの gas / gasoline に相当。" },
  { id: "tube_016", category: "tube", front: "レンタカーを借りたいです", back: "I'd like to hire a car.", phonetics: "アイドゥ ライク トゥ ハイア ア カー", notes: "hire = レンタルする。アメリカの rent に相当するイギリス英語。" },
  { id: "tube_017", category: "tube", front: "地下道を通ってください", back: "Go through the subway.", phonetics: "ゴー スルー ザ サブウェイ", notes: "subway = 地下道（イギリス）。アメリカでは地下鉄の意味だが注意。" },
  { id: "tube_018", category: "tube", front: "コンタクトレス決済で乗れますか？", back: "Can I use Contactless?", phonetics: "キャン アイ ユーズ コンタクトレス", notes: "Contactless = 非接触決済。ロンドンの交通機関ではほぼ全て対応。" },
  { id: "tube_019", category: "tube", front: "エスカレーターの右側に立ってください", back: "Stand on the right on the escalator.", phonetics: "スタンド オン ザ ライト オン ジ エスカレイター", notes: "ロンドンの地下鉄でのマナー。左側は歩く人のために空ける。" },
  { id: "tube_020", category: "tube", front: "この電車はピカデリー・サーカスに止まりますか？", back: "Does this train stop at Piccadilly Circus?", phonetics: "ダズ ディス トレイン ストップ アット ピカデリー サーカス", notes: "stop at = ～に止まる。目的地確認の基本表現。" },
  { id: "tube_021", category: "tube", front: "駐車場はどこですか？", back: "Where is the car park?", phonetics: "ウェア イズ ザ カー パーク", notes: "car park = 駐車場。アメリカの parking lot に相当するイギリス英語。" },
  { id: "tube_022", category: "tube", front: "高速道路で行った方が早いです", back: "It's quicker to take the motorway.", phonetics: "イッツ クイッカー トゥ テイク ザ モーターウェイ", notes: "motorway = 高速道路。アメリカの highway / freeway に相当。" },
  { id: "tube_023", category: "tube", front: "道を教えていただけますか？", back: "Could you give me directions, please?", phonetics: "クッジュー ギヴ ミー ディレクションズ プリーズ", notes: "give directions = 道を教える。丁寧な道の尋ね方。" },
  { id: "tube_024", category: "tube", front: "信号を左に曲がってください", back: "Turn left at the traffic lights.", phonetics: "ターン レフト アット ザ トラフィック ライツ", notes: "traffic lights = 信号。イギリスでは複数形が一般的。" },
  { id: "tube_025", category: "tube", front: "定期券はありますか？", back: "Do you sell travel cards?", phonetics: "ドゥ ユー セル トラベル カーズ", notes: "travel card = 定期券・乗り放題券。ロンドンでの移動に便利。" },

  // ============================
  // カテゴリ5: Shopping（買い物）
  // ============================
  { id: "shop_001", category: "shopping", front: "レジはどこですか？", back: "Where is the till?", phonetics: "ウェア イズ ザ ティル", notes: "till = レジ。アメリカの cash register / checkout に相当するイギリス英語。" },
  { id: "shop_002", category: "shopping", front: "見ているだけです、ありがとう", back: "I'm just browsing, thanks.", phonetics: "アイム ジャスト ブラウジング サンクス", notes: "browsing = 見て回っている。店員に声をかけられた時の定番返答。" },
  { id: "shop_003", category: "shopping", front: "これはいくらですか？", back: "How much is this in quid?", phonetics: "ハウ マッチ イズ ディス イン クウィッド", notes: "quid = ポンド（口語）。1 quid = 1ポンド。複数でも quid。" },
  { id: "shop_004", category: "shopping", front: "チャリティショップはありますか？", back: "Is there a charity shop nearby?", phonetics: "イズ ゼア ア チャリティ ショップ ニアバイ", notes: "charity shop = 寄付品を販売するお店。イギリスの町に必ずある。" },
  { id: "shop_005", category: "shopping", front: "レシートをもらえますか？", back: "Could I have the receipt, please?", phonetics: "クッド アイ ハヴ ザ リシート プリーズ", notes: "receipt = レシート。発音は「リシート」（pは発音しない）。" },
  { id: "shop_006", category: "shopping", front: "試着してもいいですか？", back: "Could I try this on?", phonetics: "クッド アイ トライ ディス オン", notes: "try on = 試着する。fitting room（試着室）を案内される。" },
  { id: "shop_007", category: "shopping", front: "レジ袋は有料です", back: "Carrier bags are chargeable.", phonetics: "キャリア バッグズ アー チャージャブル", notes: "carrier bag = レジ袋。イギリスでは有料（通常5-10p）。" },
  { id: "shop_008", category: "shopping", front: "これの大きいサイズはありますか？", back: "Have you got this in a larger size?", phonetics: "ハヴ ユー ゴット ディス イン ア ラージャー サイズ", notes: "Have you got ~ = Do you have ~。イギリスで好まれる表現。" },
  { id: "shop_009", category: "shopping", front: "返品したいのですが", back: "I'd like to return this, please.", phonetics: "アイドゥ ライク トゥ リターン ディス プリーズ", notes: "return = 返品する。レシート（receipt）が必要な場合が多い。" },
  { id: "shop_010", category: "shopping", front: "免税手続きはできますか？", back: "Can I get a VAT refund?", phonetics: "キャン アイ ゲット ア ヴァット リファンド", notes: "VAT = 付加価値税（Value Added Tax）。イギリスでは20%。" },
  { id: "shop_011", category: "shopping", front: "お釣りが間違っています", back: "I think the change is wrong.", phonetics: "アイ シンク ザ チェインジ イズ ロング", notes: "change = お釣り。I think ~ で控えめに伝えるのがイギリス流。" },
  { id: "shop_012", category: "shopping", front: "ギフト用に包装してもらえますか？", back: "Could you gift wrap this, please?", phonetics: "クッジュー ギフト ラップ ディス プリーズ", notes: "gift wrap = ギフト用に包装する。百貨店などで対応可能。" },
  { id: "shop_013", category: "shopping", front: "セール品はどこですか？", back: "Where are the sale items?", phonetics: "ウェア アー ザ セイル アイテムズ", notes: "sale = セール。Boxing Day（12月26日）セールが有名。" },
  { id: "shop_014", category: "shopping", front: "値引きしてもらえますか？", back: "Could you do a discount?", phonetics: "クッジュー ドゥー ア ディスカウント", notes: "マーケットなどでは値引き交渉が可能な場合がある。" },
  { id: "shop_015", category: "shopping", front: "地下1階の食品売り場はどこですか？", back: "Where is the food hall in the basement?", phonetics: "ウェア イズ ザ フード ホール イン ザ ベイスメント", notes: "food hall = 食品売り場。デパ地下のようなもの。Harrods が有名。" },
  { id: "shop_016", category: "shopping", front: "ポイントカードはお持ちですか？", back: "Do you have a loyalty card?", phonetics: "ドゥ ユー ハヴ ア ロイヤルティ カード", notes: "loyalty card = ポイントカード。Tesco Clubcard, Nectar card など。" },
  { id: "shop_017", category: "shopping", front: "非接触で支払います", back: "Contactless, please.", phonetics: "コンタクトレス プリーズ", notes: "Contactless = 非接触決済。イギリスではほぼ全店舗で対応。" },
  { id: "shop_018", category: "shopping", front: "おつかいものですか？（店員からの質問）", back: "Is this a gift?", phonetics: "イズ ディス ア ギフト", notes: "店員がよく聞く質問。Yes と言えば包装してもらえる場合がある。" },
  { id: "shop_019", category: "shopping", front: "両替してもらえますか？", back: "Could you give me change?", phonetics: "クッジュー ギヴ ミー チェインジ", notes: "change = 小銭 / 両替。£20紙幣を崩したい時に使う。" },
  { id: "shop_020", category: "shopping", front: "これは最後の1点ですか？", back: "Is this the last one?", phonetics: "イズ ディス ザ ラスト ワン", notes: "在庫確認の表現。Could you check in the back? と続けることも。" },
  { id: "shop_021", category: "shopping", front: "入り口はあちらです", back: "The entrance is over there.", phonetics: "ジ エントランス イズ オーヴァー ゼア", notes: "over there = あちら。方向を示す基本表現。" },
  { id: "shop_022", category: "shopping", front: "閉店時間は何時ですか？", back: "What time do you close?", phonetics: "ワット タイム ドゥ ユー クローズ", notes: "close = 閉まる。イギリスでは日曜は営業時間が短い店が多い。" },
  { id: "shop_023", category: "shopping", front: "地上階にあります", back: "It's on the ground floor.", phonetics: "イッツ オン ザ グラウンド フロア", notes: "ground floor = 1階。first floor はイギリスでは2階。要注意。" },
  { id: "shop_024", category: "shopping", front: "マークス&スペンサーはどこですか？", back: "Where is the nearest Marks & Spencer?", phonetics: "ウェア イズ ザ ニアレスト マークス アンド スペンサー", notes: "M&S = イギリスの国民的百貨店。食品が特に高品質で有名。" },
  { id: "shop_025", category: "shopping", front: "ペニーが足りません", back: "I'm a few pence short.", phonetics: "アイム ア フュー ペンス ショート", notes: "pence = ペニーの複数形。1ポンド = 100ペンス。" },

  // ============================
  // カテゴリ6: Emergencies（緊急事態）
  // ============================
  { id: "emergency_001", category: "emergencies", front: "救急車を呼んでください！", back: "Call 999!", phonetics: "コール ナイン ナイン ナイン", notes: "999 = イギリスの緊急通報番号（日本の110/119に相当）。112でもOK。" },
  { id: "emergency_002", category: "emergencies", front: "救急外来はどこですか？", back: "Where is A&E?", phonetics: "ウェア イズ エーアンドイー", notes: "A&E = Accident & Emergency（救急外来）。NHSの病院にある。" },
  { id: "emergency_003", category: "emergencies", front: "薬局はどこですか？", back: "Where is the nearest chemist?", phonetics: "ウェア イズ ザ ニアレスト ケミスト", notes: "chemist = 薬局。アメリカの pharmacy / drugstore に相当。Boots が有名。" },
  { id: "emergency_004", category: "emergencies", front: "パスポートを紛失しました", back: "I've lost my passport.", phonetics: "アイヴ ロスト マイ パスポート", notes: "lost = なくした。警察に被害届（crime reference number）をもらう必要がある。" },
  { id: "emergency_005", category: "emergencies", front: "財布を盗まれました", back: "My wallet has been stolen.", phonetics: "マイ ウォレット ハズ ビーン ストールン", notes: "stolen = 盗まれた。警察署（police station）で報告する。" },
  { id: "emergency_006", category: "emergencies", front: "気分が悪いです", back: "I'm feeling unwell.", phonetics: "アイム フィーリング アンウェル", notes: "unwell = 体調が悪い。sick よりもイギリスで好まれる上品な表現。" },
  { id: "emergency_007", category: "emergencies", front: "医者に診てもらいたいです", back: "I need to see a GP.", phonetics: "アイ ニード トゥ シー ア ジーピー", notes: "GP = General Practitioner（かかりつけ医）。NHSの基本的な受診先。" },
  { id: "emergency_008", category: "emergencies", front: "この薬の処方箋が必要です", back: "I need a prescription for this medicine.", phonetics: "アイ ニード ア プリスクリプション フォー ディス メディスン", notes: "prescription = 処方箋。NHSでは処方料が定額（約£9.90）。" },
  { id: "emergency_009", category: "emergencies", front: "頭痛薬はありますか？", back: "Have you got any paracetamol?", phonetics: "ハヴ ユー ゴット エニー パラセタモール", notes: "paracetamol = アセトアミノフェン系鎮痛剤。イギリスで最も一般的な頭痛薬。" },
  { id: "emergency_010", category: "emergencies", front: "保険証を持っています", back: "I have travel insurance.", phonetics: "アイ ハヴ トラベル インシュアランス", notes: "travel insurance = 旅行保険。NHSは基本無料だが旅行者は保険があると安心。" },
  { id: "emergency_011", category: "emergencies", front: "警察署はどこですか？", back: "Where is the police station?", phonetics: "ウェア イズ ザ ポリース ステイション", notes: "緊急でない場合は 101（非緊急警察番号）に電話する方法もある。" },
  { id: "emergency_012", category: "emergencies", front: "日本大使館に連絡したいです", back: "I need to contact the Japanese Embassy.", phonetics: "アイ ニード トゥ コンタクト ザ ジャパニーズ エンバシー", notes: "Embassy = 大使館。ロンドンの日本大使館: 020 7465 6500。" },
  { id: "emergency_013", category: "emergencies", front: "アレルギーがあります", back: "I have an allergy.", phonetics: "アイ ハヴ アン アラジー", notes: "allergy = アレルギー。発音は「アラジー」。具体的に何のアレルギーか伝える。" },
  { id: "emergency_014", category: "emergencies", front: "道に迷いました", back: "I'm lost.", phonetics: "アイム ロスト", notes: "最もシンプルな助けを求める表現。Could you help me? と続ける。" },
  { id: "emergency_015", category: "emergencies", front: "英語があまり話せません", back: "I don't speak much English, I'm afraid.", phonetics: "アイ ドント スピーク マッチ イングリッシュ アイム アフレイド", notes: "I'm afraid = 申し訳ないのですが。イギリスらしい控えめな表現。" },
  { id: "emergency_016", category: "emergencies", front: "もう少しゆっくり話してもらえますか？", back: "Could you speak a bit more slowly, please?", phonetics: "クッジュー スピーク ア ビット モア スローリー プリーズ", notes: "a bit = 少し。イギリスで好まれる控えめな依頼表現。" },
  { id: "emergency_017", category: "emergencies", front: "ここから一番近い病院はどこですか？", back: "Where is the nearest hospital?", phonetics: "ウェア イズ ザ ニアレスト ホスピタル", notes: "nearest = 最寄りの。緊急時に使う重要表現。" },
  { id: "emergency_018", category: "emergencies", front: "歯が痛いです", back: "I've got toothache.", phonetics: "アイヴ ゴット トゥースエイク", notes: "toothache = 歯痛。I've got ~ はイギリスで好まれる表現（I have ~の代わり）。" },
  { id: "emergency_019", category: "emergencies", front: "火事だ！", back: "Fire!", phonetics: "ファイア", notes: "火事の時は999に電話し、Fire service を要請する。" },
  { id: "emergency_020", category: "emergencies", front: "助けてください！", back: "Help! / Could somebody help me?", phonetics: "ヘルプ / クッド サムバディ ヘルプ ミー", notes: "緊急時の基本表現。丁寧に言う場合は Could somebody ~ を使う。" },
  { id: "emergency_021", category: "emergencies", front: "クレジットカードを止めたいです", back: "I need to cancel my credit card.", phonetics: "アイ ニード トゥ キャンセル マイ クレジット カード", notes: "cancel = 停止する。盗難時は直ちにカード会社に連絡する。" },
  { id: "emergency_022", category: "emergencies", front: "通訳をお願いできますか？", back: "Could I have an interpreter, please?", phonetics: "クッド アイ ハヴ アン インタープリター プリーズ", notes: "interpreter = 通訳。translator（翻訳者）との違いに注意。" },
  { id: "emergency_023", category: "emergencies", front: "具合の悪い人がいます", back: "Somebody is taken ill.", phonetics: "サムバディ イズ テイクン イル", notes: "taken ill = 具合が悪くなった。イギリス英語特有の表現。" },
  { id: "emergency_024", category: "emergencies", front: "この辺りは安全ですか？", back: "Is this area safe?", phonetics: "イズ ディス エリア セイフ", notes: "夜間や見知らぬ場所で確認する時の表現。" },
  { id: "emergency_025", category: "emergencies", front: "携帯電話を充電させてもらえますか？", back: "Could I charge my phone here?", phonetics: "クッド アイ チャージ マイ フォン ヒア", notes: "charge = 充電する。カフェやホテルで頼める場合がある。" }
];

// カテゴリ情報
const CATEGORIES = {
  airport: { name: "Airport / Immigration", nameJa: "空港・入国審査", icon: "✈️", color: "#2E5090" },
  hotel: { name: "Hotel", nameJa: "ホテル", icon: "🏨", color: "#8B4513" },
  pub: { name: "Pub / Restaurant", nameJa: "パブ・レストラン", icon: "🍺", color: "#B8860B" },
  tube: { name: "Tube / Transport", nameJa: "地下鉄・交通", icon: "🚇", color: "#CC3333" },
  shopping: { name: "Shopping", nameJa: "買い物", icon: "🛍️", color: "#2E8B57" },
  emergencies: { name: "Emergencies", nameJa: "緊急事態", icon: "🚨", color: "#DC143C" }
};

// ============================
// リスニングクイズデータ
// 英語音声を聴いて、その意味（日本語）を3択で選ぶ
// situation: 場面のヒント（答えは推測できない程度）
// correctId: 正解のボキャブラリーID
// wrongChoices: 不正解の日本語選択肢（紛らわしいもの）
// ============================
const LISTENING_DATA = {
  airport: [
    { id: "ls_air_01", situation: "空港の係員があなたに話しかけています", correctId: "airport_001", wrongChoices: ["パスポートを見せてください", "荷物を開けてください"] },
    { id: "ls_air_02", situation: "入国審査のカウンターにて", correctId: "airport_004", wrongChoices: ["お荷物はいくつですか？", "どちらのホテルにお泊まりですか？"] },
    { id: "ls_air_03", situation: "空港の案内板の前で", correctId: "airport_002", wrongChoices: ["出発ロビーはどこですか？", "搭乗口はどこですか？"] },
    { id: "ls_air_04", situation: "セキュリティチェックにて", correctId: "airport_015", wrongChoices: ["ベルトと靴を外してください", "パスポートを出してください"] },
    { id: "ls_air_05", situation: "チェックインカウンターにて", correctId: "airport_024", wrongChoices: ["通路側の席をお願いします", "どの席でも構いません"] },
    { id: "ls_air_06", situation: "空港の到着ロビーにて", correctId: "airport_020", wrongChoices: ["タクシー乗り場はどこですか？", "両替所はどこですか？"] }
  ],
  hotel: [
    { id: "ls_hot_01", situation: "ホテルのフロントにて", correctId: "hotel_001", wrongChoices: ["空いている部屋はありますか？", "今日の料金はいくらですか？"] },
    { id: "ls_hot_02", situation: "ホテルのフロントに電話中", correctId: "hotel_002", wrongChoices: ["部屋を変えてもらえますか？", "シャワーが壊れています"] },
    { id: "ls_hot_03", situation: "ホテルのレストランにて", correctId: "hotel_004", wrongChoices: ["コンチネンタルブレックファストを", "トーストだけお願いします"] },
    { id: "ls_hot_04", situation: "ホテルのロビーにて", correctId: "hotel_007", wrongChoices: ["階段はどこですか？", "出口はどこですか？"] },
    { id: "ls_hot_05", situation: "ホテルの部屋で", correctId: "hotel_013", wrongChoices: ["コーヒーメーカーはありますか？", "ルームサービスを頼めますか？"] },
    { id: "ls_hot_06", situation: "チェックアウト時", correctId: "hotel_023", wrongChoices: ["領収書は要りません", "延泊できますか？"] }
  ],
  pub: [
    { id: "ls_pub_01", situation: "パブのカウンターにて", correctId: "pub_005", wrongChoices: ["ワインを一杯ください", "コーラをください"] },
    { id: "ls_pub_02", situation: "レストランでウェイターに", correctId: "pub_001", wrongChoices: ["メニューをもらえますか？", "もう一品追加します"] },
    { id: "ls_pub_03", situation: "レストランでウェイターに", correctId: "pub_003", wrongChoices: ["前菜は何がありますか？", "メインは何がおすすめですか？"] },
    { id: "ls_pub_04", situation: "レストランにて", correctId: "pub_008", wrongChoices: ["ここで食べます", "配達してもらえますか？"] },
    { id: "ls_pub_05", situation: "電話で予約中", correctId: "pub_011", wrongChoices: ["今すぐ入れますか？", "待ち時間はどのくらいですか？"] },
    { id: "ls_pub_06", situation: "パブで友人たちと", correctId: "pub_018", wrongChoices: ["割り勘にしましょう", "自分の分だけ払います"] }
  ],
  tube: [
    { id: "ls_tub_01", situation: "地下鉄のホームでアナウンスが流れています", correctId: "tube_001", wrongChoices: ["ドアが閉まります", "この電車は回送です"] },
    { id: "ls_tub_02", situation: "駅の窓口にて", correctId: "tube_002", wrongChoices: ["新しいカードを買いたいです", "カードを返却したいです"] },
    { id: "ls_tub_03", situation: "駅の窓口にて", correctId: "tube_003", wrongChoices: ["片道切符をください", "1日乗車券をください"] },
    { id: "ls_tub_04", situation: "駅のホームにて", correctId: "tube_006", wrongChoices: ["この電車は直通ですか？", "終点はどこですか？"] },
    { id: "ls_tub_05", situation: "通りで地元の人に", correctId: "tube_023", wrongChoices: ["地図を見せてもらえますか？", "タクシーを呼んでください"] },
    { id: "ls_tub_06", situation: "タクシーの運転手に", correctId: "tube_014", wrongChoices: ["後部座席に置いてください", "ここで降ります"] }
  ],
  shopping: [
    { id: "ls_shp_01", situation: "お店で店員に", correctId: "shop_001", wrongChoices: ["出口はどこですか？", "試着室はどこですか？"] },
    { id: "ls_shp_02", situation: "洋服店で店員に", correctId: "shop_002", wrongChoices: ["おすすめはありますか？", "サイズを教えてください"] },
    { id: "ls_shp_03", situation: "洋服店で店員に", correctId: "shop_006", wrongChoices: ["これを買います", "色違いはありますか？"] },
    { id: "ls_shp_04", situation: "レジにて", correctId: "shop_007", wrongChoices: ["ギフト包装をお願いします", "配送してもらえますか？"] },
    { id: "ls_shp_05", situation: "レジにて", correctId: "shop_010", wrongChoices: ["学生割引はありますか？", "セール品はどこですか？"] },
    { id: "ls_shp_06", situation: "レジにて", correctId: "shop_017", wrongChoices: ["現金で支払います", "クレジットカードで支払います"] }
  ],
  emergencies: [
    { id: "ls_emg_01", situation: "緊急事態が発生！", correctId: "emergency_001", wrongChoices: ["警察を呼んでください", "消防車を呼んでください"] },
    { id: "ls_emg_02", situation: "体調が悪い時に", correctId: "emergency_003", wrongChoices: ["病院はどこですか？", "救急車を呼んでください"] },
    { id: "ls_emg_03", situation: "ホテルのフロントに電話", correctId: "emergency_004", wrongChoices: ["財布を盗まれました", "カギを失くしました"] },
    { id: "ls_emg_04", situation: "薬局の店員に", correctId: "emergency_009", wrongChoices: ["風邪薬はありますか？", "胃薬はありますか？"] },
    { id: "ls_emg_05", situation: "会話の相手に", correctId: "emergency_016", wrongChoices: ["もう一度言ってもらえますか？", "紙に書いてもらえますか？"] },
    { id: "ls_emg_06", situation: "通りで地元の人に", correctId: "emergency_014", wrongChoices: ["タクシーを呼んでください", "地図を買いたいです"] }
  ]
};
