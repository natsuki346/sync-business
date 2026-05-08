# SYNC. - 社内アイデンティティ名鑑

## プロジェクト概要
アイデンティティを可視化することで「ここにいていいんだ」という安心感を生み出す社内向けアプリ。

## 技術スタック
- Next.js 14（App Router）
- TypeScript
- Tailwind CSS
- モバイルファースト（max-width: 430px）

## カラー
- メイン: #1D9E75（teal）
- サブ: #E1F5EE（teal light）

## ディレクトリ構成
src/
├── app/
│   ├── layout.tsx         # BottomNav込みのルートレイアウト
│   ├── page.tsx           # ホーム
│   ├── directory/page.tsx # 名鑑一覧（コミュニティ＋人名検索）
│   ├── profile/[id]/page.tsx # 個人詳細
│   └── nearby/page.tsx    # 近くの人
├── components/
│   ├── layout/BottomNav.tsx
│   ├── layout/Header.tsx
│   ├── cards/PersonCard.tsx
│   └── profile/TagGroup.tsx
├── data/mock.ts           # モックデータ（将来API差し替え）
└── types/index.ts         # 型定義

## データ型（Person）
- id, name, department, year, matchScore(0-100), isNearby, followingTags(string[]), tags{hobby/value/obsessed/talk}, message, avatarColor

## データ型（Tag）
- id, name

## モックデータ
### allTags（10件）
- indie-music, cooking, career, hiking, cycling, art, parenting, jazz, vintage, photography

### people（4人）
- 田中莉子: 営業部2年目, 78%, 近くにいる, followingTags: ['indie-music', 'cooking', 'career', 'photography']
- 佐藤健太: 企画部8年目, 62%, followingTags: ['hiking', 'parenting']
- 鈴木誠: 営業部15年目, 45%, 近くにいる, followingTags: ['cycling', 'jazz']
- 山田さくら: デザイン部3年目, 91%, followingTags: ['indie-music', 'art', 'vintage']

### currentUser（ログインユーザー）
- 木村あおい: マーケティング部1年目, followingTags: ['indie-music', 'cooking', 'career']

## 名鑑画面（directory/page.tsx）の仕様
- 検索バー空欄: currentUserのfollowingTagsのコミュニティ一覧をアコーディオンで表示
- #から始まる入力: タグ名で絞り込んだコミュニティ表示
- 人名入力: peopleから名前一致をPersonCardで表示
- アコーディオン内メンバー: 名前・部署のシンプル表示、タップでプロフィールへ

## コンポーネントルール
- Server Componentを基本、インタラクションがある箇所のみ'use client'
- スタイルはTailwindのみ

## 今後追加予定（今は実装しない）
- 繋がりマップ（D3.js）
- BLE近接通信
- プロフィール編集
- 全社ルーム（匿名Q&A）
