// ============================
// UK英語リスニングモード データセット
// コンセプト: 相手の英語の問いかけ（音声）を聞き、3択から最も適切な「返答」を選ぶ
// ============================

const LISTENING_DATA = [
    // ============================
    // カテゴリ1: Airport / Immigration（空港・入国審査）
    // ============================
    {
        id: "listen_airport_001",
        category: "airport",
        situation: "入国審査官から質問されています",
        audioPhrase: "What is the purpose of your visit?",
        options: [
            { text: "Sightseeing, for about a week.", isCorrect: true },
            { text: "I have nothing to declare.", isCorrect: false },
            { text: "Here is my return ticket.", isCorrect: false }
        ],
        explanation: "「What is the purpose of your visit?（滞在目的は何ですか？）」と聞かれているので、「Sightseeing（観光です）」と答えるのが正解です。"
    },
    {
        id: "listen_airport_002",
        category: "airport",
        situation: "税関（Customs）を通る際に係員に声をかけられました",
        audioPhrase: "Do you have anything to declare?",
        options: [
            { text: "I'm staying at a hotel in London.", isCorrect: false },
            { text: "No, nothing to declare.", isCorrect: true },
            { text: "I only have hand luggage.", isCorrect: false }
        ],
        explanation: "「Do you have anything to declare?（申告するものはありますか？）」への定番の返答は「Nothing to declare.（ありません）」です。"
    },
    {
        id: "listen_airport_003",
        category: "airport",
        situation: "保安検査場（Security）で係員から指示を受けました",
        audioPhrase: "Please remove your belt and shoes.",
        options: [
            { text: "Sure, here they are.", isCorrect: true },
            { text: "I'd like a window seat, please.", isCorrect: false },
            { text: "My luggage hasn't come through.", isCorrect: false }
        ],
        explanation: "「ベルトと靴を外してください」という指示なので、それに従って「Sure（分かりました）」と対応するのが適切です。"
    },
    {
        id: "listen_airport_004",
        category: "airport",
        situation: "入国審査官に滞在期間を聞かれています",
        audioPhrase: "How long do you intend to stay?",
        options: [
            { text: "Just five days.", isCorrect: true },
            { text: "Holiday and sightseeing.", isCorrect: false },
            { text: "I'm travelling alone.", isCorrect: false }
        ],
        explanation: "「How long do you intend to stay?（どのくらい滞在する予定ですか？）」なので、期間（five days）を答えます。"
    },
    {
        id: "listen_airport_005",
        category: "airport",
        situation: "チェックインカウンターで座席の希望を聞かれました",
        audioPhrase: "Would you prefer an aisle seat or a window seat?",
        options: [
            { text: "Yes, please.", isCorrect: false },
            { text: "A window seat, please.", isCorrect: true },
            { text: "I only have hand luggage.", isCorrect: false }
        ],
        explanation: "通路側（aisle）か窓側（window）かを聞かれているので、具体的な座席を答えます。"
    },

    // ============================
    // カテゴリ2: Hotel（ホテル）
    // ============================
    {
        id: "listen_hotel_001",
        category: "hotel",
        situation: "ホテルのレセプションでチェックインしようとしています",
        audioPhrase: "Good evening. Do you have a booking with us?",
        options: [
            { text: "Yes, under the name of Tanaka.", isCorrect: true },
            { text: "I'd like a full English, please.", isCorrect: false },
            { text: "Yes, I'd like to check out, please.", isCorrect: false }
        ],
        explanation: "「Do you have a booking?（予約はありますか？）」と聞かれているので、「はい、田中という名前です」と答えます。"
    },
    {
        id: "listen_hotel_002",
        category: "hotel",
        situation: "チェックアウト時にフロントスタッフに聞かれました",
        audioPhrase: "Did you have anything from the minibar?",
        options: [
            { text: "No, nothing, thank you.", isCorrect: true },
            { text: "Yes, the heating isn't working.", isCorrect: false },
            { text: "Could I have a wake-up call?", isCorrect: false }
        ],
        explanation: "「ミニバー（部屋の有料飲料）は利用しましたか？」という定型質問です。"
    },
    {
        id: "listen_hotel_003",
        category: "hotel",
        situation: "朝食会場の入り口でスタッフに聞かれました",
        audioPhrase: "What's your room number, please?",
        options: [
            { text: "It's on the ground floor.", isCorrect: false },
            { text: "I'll have the full English.", isCorrect: false },
            { text: "It's 402.", isCorrect: true }
        ],
        explanation: "部屋番号（room number）を聞かれているので、自身の部屋番号を答えます。"
    },
    {
        id: "listen_hotel_004",
        category: "hotel",
        situation: "部屋のWi-Fiについてレセプションで尋ねました",
        audioPhrase: "Of course. The Wi-Fi code is on the back of your key card.",
        options: [
            { text: "Thank you, I'll check it.", isCorrect: true },
            { text: "Could I change to a twin room?", isCorrect: false },
            { text: "Is there a safe in the room?", isCorrect: false }
        ],
        explanation: "「Wi-Fiのパスワード（code）はカードキーの裏にありますよ」と言われたので、お礼を言って確認します。"
    },
    {
        id: "listen_hotel_005",
        category: "hotel",
        situation: "チェックアウト後、荷物をどうするか聞かれました",
        audioPhrase: "Would you like us to keep your luggage until you leave?",
        options: [
            { text: "Yes, that would be great, thanks.", isCorrect: true },
            { text: "Where is the lift?", isCorrect: false },
            { text: "No, the room next door is quite noisy.", isCorrect: false }
        ],
        explanation: "「出発まで荷物をお預かりしましょうか？」という親切な申し出なので、預けたい場合は Yes と伝えます。"
    },

    // ============================
    // カテゴリ3: Pub / Restaurant（パブ・レストラン）
    // ============================
    {
        id: "listen_pub_001",
        category: "pub",
        situation: "パブのバーカウンターで注文を聞かれています",
        audioPhrase: "What can I get for you?",
        options: [
            { text: "Could I have the bill, please?", isCorrect: false },
            { text: "A pint of local ale, please.", isCorrect: true },
            { text: "Is service included?", isCorrect: false }
        ],
        explanation: "「What can I get for you?（何になさいますか？）」と注文を聞かれているので、飲みたいものを伝えます。"
    },
    {
        id: "listen_pub_002",
        category: "pub",
        situation: "パブのバーテンダーに氷を入れるか聞かれました",
        audioPhrase: "Would you like ice and lemon with that?",
        options: [
            { text: "Yes, please.", isCorrect: true },
            { text: "A jacket potato, please.", isCorrect: false },
            { text: "This round is on me.", isCorrect: false }
        ],
        explanation: "ソフトドリンクやジンなどを頼んだ時によく聞かれる「氷とレモンはお付けしますか？」という質問です。"
    },
    {
        id: "listen_pub_003",
        category: "pub",
        situation: "食事が終わったころ、ウェイターがテーブルに来て言いました",
        audioPhrase: "Would you like to see the pudding menu?",
        options: [
            { text: "What starters do you have?", isCorrect: false },
            { text: "No thanks, just the bill, please.", isCorrect: true },
            { text: "Fish and chips, please.", isCorrect: false }
        ],
        explanation: "「デザート（pudding）のメニューを見ますか？」と聞かれているので、頼むか、もしくはお会計を頼みます。"
    },
    {
        id: "listen_pub_004",
        category: "pub",
        situation: "紅茶を注文した際、カフェの店員に聞かれました",
        audioPhrase: "Do you take milk and sugar?",
        options: [
            { text: "Just a dash of milk, please.", isCorrect: true },
            { text: "I'd rather have coffee.", isCorrect: false },
            { text: "Scones with clotted cream, please.", isCorrect: false }
        ],
        explanation: "「ミルクと砂糖は入れますか？」と聞かれているので、自身の好みを伝えます（dash of milk = 少しのミルク）。"
    },
    {
        id: "listen_pub_005",
        category: "pub",
        situation: "レストランで食事中にウェイターが確認に来ました",
        audioPhrase: "Is everything alright with your meal?",
        options: [
            { text: "Yes, it's delicious, thank you.", isCorrect: true },
            { text: "Can we pay separately?", isCorrect: false },
            { text: "I'd like to book a table for two.", isCorrect: false }
        ],
        explanation: "「お食事はいかがですか？（問題ないですか？）」という確認なので、問題なければ美味しいと伝えます。"
    },

    // ============================
    // カテゴリ4: Tube / Transport（地下鉄・交通）
    // ============================
    {
        id: "listen_tube_001",
        category: "tube",
        situation: "地下鉄の窓口で、駅員に切符の種類を聞かれました",
        audioPhrase: "Single or return?",
        options: [
            { text: "A single, please.", isCorrect: true },
            { text: "Mind the gap.", isCorrect: false },
            { text: "Where do I change for this line?", isCorrect: false }
        ],
        explanation: "「片道（single）ですか？往復（return）ですか？」と聞かれています。"
    },
    {
        id: "listen_tube_002",
        category: "tube",
        situation: "通りすがりの人に道を尋ねたときの返答です",
        audioPhrase: "Go straight on, and take the second left. You can't miss it.",
        options: [
            { text: "Thank you very much.", isCorrect: true },
            { text: "Does this train stop at Piccadilly Circus?", isCorrect: false },
            { text: "I'd like to top up my Oyster card.", isCorrect: false }
        ],
        explanation: "「まっすぐ行って、2本目を左です。すぐ分かりますよ」と親切に教えてくれたのでお礼を言います。"
    },
    {
        id: "listen_tube_003",
        category: "tube",
        situation: "黒タクシー（Black cab）に乗り込んだ際に運転手に聞かれました",
        audioPhrase: "Where to, mate?",
        options: [
            { text: "Put the bags in the boot.", isCorrect: false },
            { text: "To Paddington station, please.", isCorrect: true },
            { text: "Where is the nearest petrol station?", isCorrect: false }
        ],
        explanation: "「どこまで行くんだい？」と目的地を聞かれているので、行き先を伝えます。"
    },
    {
        id: "listen_tube_004",
        category: "tube",
        situation: "バスの運転手に現金で払おうとしたところ、こう言われました",
        audioPhrase: "Sorry, we only take Contactless or Oyster cards now.",
        options: [
            { text: "Oh, it's quicker to take the motorway.", isCorrect: false },
            { text: "Do you sell travel cards?", isCorrect: false },
            { text: "Ah, I'll use my contactless card then.", isCorrect: true }
        ],
        explanation: "「現金はダメで、非接触決済かオイスターカードのみです」と言われたので、カードで支払う旨を伝えます。"
    },
    {
        id: "listen_tube_005",
        category: "tube",
        situation: "地下鉄のエスカレーターで左側に立っていたら、後ろの人に声をかけられました",
        audioPhrase: "Excuse me, could you stand on the right, please?",
        options: [
            { text: "Oh, sorry about that.", isCorrect: true },
            { text: "I'd like to get off here.", isCorrect: false },
            { text: "How long till the next train?", isCorrect: false }
        ],
        explanation: "ロンドンのエスカレーターは「右側に立つ」のがマナーです。指摘されたら謝って右に寄りましょう。"
    },

    // ============================
    // カテゴリ5: Shopping（買い物）
    // ============================
    {
        id: "listen_shop_001",
        category: "shopping",
        situation: "洋服を見ていると、店員が声をかけてきました",
        audioPhrase: "Are you okay there, or do you need any help?",
        options: [
            { text: "I'm just browsing, thanks.", isCorrect: true },
            { text: "Where is the till?", isCorrect: false },
            { text: "Is this the last one?", isCorrect: false }
        ],
        explanation: "「何かお探しですか？」と同じ意図の声かけです。特に用がなければ「just browsing（見てるだけです）」と答えます。"
    },
    {
        id: "listen_shop_002",
        category: "shopping",
        situation: "レジでお会計をする際、店員に聞かれました",
        audioPhrase: "Would you like a carrier bag for that?",
        options: [
            { text: "Contactless, please.", isCorrect: false },
            { text: "Yes, please. How much is it?", isCorrect: true },
            { text: "Can I get a VAT refund?", isCorrect: false }
        ],
        explanation: "「レジ袋（carrier bag）はいりますか？」と聞かれています。イギリスでは有料のため、値段を聞きつつ Yes か No を伝えます。"
    },
    {
        id: "listen_shop_003",
        category: "shopping",
        situation: "スーパーのレジで店員にカードの有無を聞かれました",
        audioPhrase: "Do you have a loyalty card with us?",
        options: [
            { text: "No, I don't.", isCorrect: true },
            { text: "I'm a few pence short.", isCorrect: false },
            { text: "Could you gift wrap this?", isCorrect: false }
        ],
        explanation: "「loyalty card（ポイントカード）はお持ちですか？」という定番の質問です。"
    },
    {
        id: "listen_shop_004",
        category: "shopping",
        situation: "試着室から出た際、店員に聞かれました",
        audioPhrase: "How did you get on with those?",
        options: [
            { text: "Where are the sale items?", isCorrect: false },
            { text: "They fit perfectly. I'll take them.", isCorrect: true },
            { text: "I think the change is wrong.", isCorrect: false }
        ],
        explanation: "「サイズ等はいかがでしたか？（うまく着られましたか？）」と聞かれているので、買うか戻すかを伝えます。"
    },
    {
        id: "listen_shop_005",
        category: "shopping",
        situation: "レジで現金で払ったところ、店員がこう言いました",
        audioPhrase: "Here's your change and receipt.",
        options: [
            { text: "Thank you. Have a good day.", isCorrect: true },
            { text: "Where is the nearest Marks & Spencer?", isCorrect: false },
            { text: "Could I have the receipt, please?", isCorrect: false }
        ],
        explanation: "「お釣りとレシートです」と渡されたので、お礼を言って受け取ります。"
    },

    // ============================
    // カテゴリ6: Emergencies（緊急事態）
    // ============================
    {
        id: "listen_emergency_001",
        category: "emergencies",
        situation: "999（緊急ダイヤル）に電話した際のオペレーターの第一声です",
        audioPhrase: "Emergency. Which service do you require?",
        options: [
            { text: "Ambulance, please!", isCorrect: true },
            { text: "I don't speak much English.", isCorrect: false },
            { text: "I have travel insurance.", isCorrect: false }
        ],
        explanation: "「どの機関（警察・消防・救急）が必要ですか？」と聞かれるので、Ambulance（救急）、Police（警察）、Fire（消防）のいずれかを答えます。"
    },
    {
        id: "listen_emergency_002",
        category: "emergencies",
        situation: "薬局で症状を伝えたところ、薬剤師にこう聞かれました",
        audioPhrase: "Are you allergic to any medication?",
        options: [
            { text: "Where is the nearest A&E?", isCorrect: false },
            { text: "No, I don't have any allergies.", isCorrect: true },
            { text: "I've got toothache.", isCorrect: false }
        ],
        explanation: "「薬に対するアレルギーはありますか？」と聞かれているので、有無を正確に伝えます。"
    },
    {
        id: "listen_emergency_003",
        category: "emergencies",
        situation: "警察署で盗難の被害を伝えた際、警察官に聞かれました",
        audioPhrase: "Where exactly did this happen?",
        options: [
            { text: "My wallet has been stolen.", isCorrect: false },
            { text: "Just outside the tube station.", isCorrect: true },
            { text: "I need to contact the Japanese Embassy.", isCorrect: false }
        ],
        explanation: "「正確にはどこで起きましたか？」と場所を聞かれているので、起きた場所を答えます。"
    },
    {
        id: "listen_emergency_004",
        category: "emergencies",
        situation: "道に迷って人に助けを求めたところ、相手が早口で説明しました",
        audioPhrase: "...so you just head down there and it's opposite the pub.",
        options: [
            { text: "Could you speak a bit more slowly, please?", isCorrect: true },
            { text: "Is this area safe?", isCorrect: false },
            { text: "I need a prescription.", isCorrect: false }
        ],
        explanation: "説明がよく分からなかった場合は、分かったふりをせずにゆっくり話してもらうよう（あるいはもう一度言うよう）にお願いします。"
    },
    {
        id: "listen_emergency_005",
        category: "emergencies",
        situation: "病院の受付で診察を希望した際、スタッフに言われました",
        audioPhrase: "Have you got your passport and travel insurance details?",
        options: [
            { text: "Somebody is taken ill.", isCorrect: false },
            { text: "Could I have an interpreter?", isCorrect: false },
            { text: "Yes, I have them right here.", isCorrect: true }
        ],
        explanation: "「パスポートと旅行保険の情報はお持ちですか？」と聞かれているので、持っていることを伝えて提示します。"
    }
];
