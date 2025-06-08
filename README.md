# 家計簿アプリ

シンプルで使いやすい家計簿アプリです。収入と支出を記録し、家計の状況を見える化します。

## 機能

- ✅ 収入・支出の記録
- ✅ カテゴリ別分類
- ✅ 残高の自動計算
- ✅ 月別収支サマリー
- ✅ 取引履歴の管理（削除機能付き）
- ✅ レスポンシブデザイン

## 技術スタック

- **フロントエンド**: Next.js 15, React 19, TypeScript
- **UI**: Tailwind CSS, Lucide React
- **バックエンド**: Supabase (PostgreSQL)
- **デプロイ**: Vercel

## セットアップ

### 1. プロジェクトのクローン

```bash
git clone <your-repository-url>
cd kakeibo-app
```

### 2. 依存関係のインストール

```bash
npm install
```

### 3. Supabaseの設定

1. [Supabase](https://supabase.com) でプロジェクトを作成
2. 以下のSQLを実行してテーブルを作成：

```sql
-- 取引テーブルの作成
CREATE TABLE transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  amount INTEGER NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 更新時刻の自動更新トリガー
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_transactions_updated_at 
  BEFORE UPDATE ON transactions 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();
```

### 4. 環境変数の設定

`.env.local` ファイルを作成し、Supabaseの設定を追加：

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 5. 開発サーバーの起動

```bash
npm run dev
```

アプリは `http://localhost:3000` で利用できます。

## デプロイ

### Vercelでのデプロイ

1. GitHubにプロジェクトをプッシュ
2. [Vercel](https://vercel.com) でプロジェクトをインポート
3. 環境変数を設定
4. デプロイ

## プロジェクト構造

```
src/
├── app/                # Next.js App Router
│   ├── globals.css    # グローバルスタイル
│   ├── layout.tsx     # ルートレイアウト
│   ├── page.tsx       # メインページ
│   └── loading.tsx    # ローディングページ
├── components/         # Reactコンポーネント
│   ├── SummaryCards.tsx
│   ├── TransactionForm.tsx
│   └── TransactionList.tsx
├── hooks/             # カスタムフック
│   └── useTransactions.ts
├── lib/               # ユーティリティ
│   └── supabase.ts
└── types/             # 型定義
    └── index.ts
```

## 使い方

1. **取引の追加**: フォームから収入または支出を選択し、金額、カテゴリ、説明を入力
2. **取引の確認**: 取引履歴で過去の記録を確認
3. **取引の削除**: 不要な取引はゴミ箱アイコンから削除
4. **残高確認**: サマリーカードで現在の残高と月別収支を確認

## ライセンス

MIT License