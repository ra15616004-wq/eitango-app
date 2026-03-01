// Firebase設定ファイル
// ※ 以下のfirebaseConfigオブジェクトに、あなたのFirebaseプロジェクトの設定情報を貼り付けてください。
// ※ 設定方法の詳細は firebase_setup_guide.md を参照してください。

const firebaseConfig = {
    // ここにあなたのFirebase設定を貼り付けてください:
    // apiKey: "YOUR_API_KEY",
    // authDomain: "YOUR_PROJECT.firebaseapp.com",
    // projectId: "YOUR_PROJECT_ID",
    // storageBucket: "YOUR_PROJECT.appspot.com",
    // messagingSenderId: "YOUR_SENDER_ID",
    // appId: "YOUR_APP_ID"
};

// Firebase設定が有効かどうかを判定
const isFirebaseConfigured = firebaseConfig && firebaseConfig.apiKey && firebaseConfig.apiKey !== "YOUR_API_KEY";
