# Mountain Climbing Habit

スマホ縦画面を前提にした、協力型習慣化ゲームのMVPです。  
健康管理ダッシュボードではなく、「仲間と同じ山道を歩き、助け合いながら進む」体験を優先して作っています。

## 概要

このアプリでは、毎日の習慣を記録すると自分が山道を前進します。  
前進はホームの山道シーンに反映され、仲間も同じ道の上に表示されます。  
疲れている仲間やつまずいている仲間には、自分の食料を使って支援できます。

MVPとして、以下を実装しています。

- オンボーディング
- 山ホーム
- 記録
- 助ける
- 仲間一覧
- マイページ
- 画面遷移
- ダミーデータによる状態変化
- `localStorage` を使ったローカル保存

## コア体験

- 習慣を記録すると `progressMeters` が増える
- 記録した結果が山ホームの山道シーンに反映される
- 仲間も同じ道の上に見える
- 仲間が `tired` または `stumbling` 状態になりうる
- 自分の `food` を使って仲間を助けられる
- 助けると仲間の状態が改善し、食料が減る

## 技術スタック

- React 18
- Vite 5
- CSS Modules ではなく、単一の `src/styles.css` で統一スタイリング
- 状態管理は `useReducer`
- 永続化は `localStorage`

## ディレクトリ構成

```text
.
├── index.html
├── package.json
├── src
│   ├── App.jsx
│   ├── styles.css
│   ├── components
│   │   ├── AppShell.jsx
│   │   ├── BottomNav.jsx
│   │   ├── CharacterSprite.jsx
│   │   ├── HabitCard.jsx
│   │   ├── ScreenHeader.jsx
│   │   ├── StatusPill.jsx
│   │   ├── TopHUD.jsx
│   │   └── TrailScene.jsx
│   ├── data
│   │   └── gameContent.js
│   ├── screens
│   │   ├── HelpScreen.jsx
│   │   ├── MountainHomeScreen.jsx
│   │   ├── OnboardingScreen.jsx
│   │   ├── PartyScreen.jsx
│   │   ├── ProfileScreen.jsx
│   │   └── RecordScreen.jsx
│   └── utils
│       └── gameLogic.js
└── climb app (3).txt
```

## 状態管理

状態は `src/utils/gameLogic.js` に集約しています。

- `user`
  - `id`
  - `name`
  - `avatarStyle`
  - `goalTitle`
  - `habits`
  - `progressMeters`
  - `food`
  - `streakDays`
  - `status`
- `partyMembers`
  - `id`
  - `name`
  - `progressMeters`
  - `food`
  - `status`
  - `positionOnTrail`
  - `note`
- `dailyLogs`
  - `id`
  - `habitId`
  - `completedAt`
  - `rewardMeters`
  - `rewardFood`
- `supportHistory`
- `route`
- `flash`

主な処理:

- `COMPLETE_ONBOARDING`
- `RECORD_HABIT`
- `HELP_MEMBER`
- `NAVIGATE`
- `DISMISS_FLASH`

## 既存 Stitch コードの扱い

`climb app (3).txt` は参照用として残しています。  
Stitch 由来の静的HTMLをそのまま使うのではなく、以下だけを引き継いで再実装しています。

- やわらかい色味
- 絵本風、水彩風の空気感
- 山道シーン中心の見せ方
- 各画面の役割

状態管理と画面遷移はすべてReact側で作り直しています。

## 実行手順

前提:

- Node.js 18 以上を推奨
- npm が使えること

### 1. 依存関係をインストール

```bash
npm install
```

### 2. 開発サーバーを起動

```bash
npm run dev
```

起動後、ターミナルに表示されるURLをブラウザで開きます。  
通常は以下のようなURLです。

```text
http://localhost:5173/
```

### 3. 触って確認する流れ

1. オンボーディングで理想の自分と習慣を選ぶ
2. 山ホームで仲間が同じ道にいるのを確認する
3. `記録` 画面で習慣を1つ記録する
4. 山ホームに戻って、自分の前進量が変わるのを確認する
5. `助ける` 画面で困っている仲間に食料を渡す
6. 山ホームや仲間一覧で、仲間の状態が改善したことを確認する

## ビルド手順

本番用ビルドを作るときは以下です。

```bash
npm run build
```

生成物は `dist/` に出力されます。

ビルド結果をローカル確認したいとき:

```bash
npm run preview
```

## 開発時の補足

### 保存データをリセットしたいとき

このアプリは `localStorage` を使っています。  
初期状態に戻したいときは、ブラウザの開発者ツールから `localStorage` を削除してください。

保存キー:

```text
mountain-climbing-habit-mvp-v1
```

### どこを見れば挙動が分かるか

- 画面切り替え: `src/App.jsx`
- ダミーデータ: `src/data/gameContent.js`
- 記録・支援ロジック: `src/utils/gameLogic.js`
- 山道シーン: `src/components/TrailScene.jsx`
- 全体スタイル: `src/styles.css`

## 利用できるスクリプト

```bash
npm run dev
npm run build
npm run preview
```

