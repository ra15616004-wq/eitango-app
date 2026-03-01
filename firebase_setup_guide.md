# Firebase セットアップガイド 🔥

このガイドでは、UK英語フラッシュカードアプリでクラウド同期を有効にするための Firebase の設定方法を説明します。

> **📝 注意:** Firebase を設定しなくてもアプリはローカルモードで動作します。複数デバイスで進捗を同期したい場合のみ設定してください。

---

## Step 1: Firebase プロジェクトを作成する

1. [Firebase コンソール](https://console.firebase.google.com/) にアクセス
2. **Google アカウント**でログイン
3. 「**プロジェクトを追加**」をクリック
4. プロジェクト名を入力（例: `eitango-app`）
5. Google Analytics は「**無効**」のままで OK → 「**プロジェクトを作成**」

---

## Step 2: Firestore データベースを有効化する

1. 左メニューの「**構築**」→「**Firestore Database**」をクリック
2. 「**データベースを作成**」をクリック
3. ロケーションは「**asia-northeast1 (Tokyo)**」を選択
4. セキュリティルールは「**テストモードで開始**」を選択 → 「**作成**」

> ⚠️ テストモードは30日間の期限があります。本格運用する場合は後述のセキュリティルールを設定してください。

---

## Step 3: Web アプリを追加して設定情報を取得する

1. Firebase コンソールのプロジェクト概要画面に戻る
2. 「**ウェブ**」のアイコン（`</>`）をクリック
3. アプリのニックネームを入力（例: `eitango-web`）
4. 「**アプリを登録**」をクリック
5. 表示される `firebaseConfig` オブジェクトを**コピー**する

```javascript
// ↓ このような情報が表示されます
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "eitango-app-xxxxx.firebaseapp.com",
  projectId: "eitango-app-xxxxx",
  storageBucket: "eitango-app-xxxxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

---

## Step 4: アプリに設定を貼り付ける

1. `firebase-config.js` ファイルを開く
2. コピーした設定情報を以下のように貼り付ける:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",               // ← あなたの値に置き換え
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

3. ファイルを保存
4. アプリをリロードすると、ヘッダーの表示が「**Cloud同期**」に変わります ✅

---

## （推奨）セキュリティルールの設定

テストモードを本番用のルールに変更する場合、Firestore の「**ルール**」タブで以下を設定してください:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if true;
    }
  }
}
```

> このルールはシンプルな認証（User ID方式）で使う場合の最低限の設定です。

---

## トラブルシューティング

| 症状 | 対処法 |
|---|---|
| 「ローカル」のまま変わらない | `firebase-config.js` の設定を再確認してください |
| コンソールにエラーが表示される | ブラウザのデベロッパーツール（F12）でエラー内容を確認 |
| データが同期されない | Firestoreのルールがテストモードか確認 |
