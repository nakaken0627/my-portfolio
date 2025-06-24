# Smart Deal EC

## 📌 サービス概要

- **サービス名**：Smart Deal EC
- **URL**：<サービスの URL を記載>
- **概要**：製造業・小売業向けの BtoB / BtoC 対応 EC システム。  
  個別契約に基づく単価設定が可能な、柔軟な注文管理機能を特徴としています。

---

## 💡 なぜこのサービスを作ったのか

前職（営業職）での経験から、お客様から以下のような課題を聞くことが多くありました。
しかし取扱サービスだけでは提案しきれず、もどかしさを感じており、これらの課題を自らの力でシステム化してみたいという思いから本サービスを企画・開発しました。

- 電話・FAX・メールでの受注が依然多く、担当者の負荷が高い
- 個別契約による価格のため、EC サイトでの一律価格表示が困難
- 自社 EC 構築には高コストがかかり、既存サービスでは柔軟なカスタマイズが難しい

---

## 🧩 システム概要

- **開発期間**：約 4 ヶ月
- **開発人数**：1 名（企画〜実装〜デプロイまで全て対応）
- **主な構築領域**：
  - 画面設計 / UI
  - DB 設計 / クエリ最適化
  - フロント・バックエンド
  - 認証基盤
  - インフラ（AWS）

### 🔧 ER 図・インフラ構成図

ER 図

インフラ構成図

> ※ 図をここに挿入してください（例：`/docs/architecture.png`）

---

## 🛠 使用技術・選定理由

| 領域         | 技術                                             | 理由                                       |
| ------------ | ------------------------------------------------ | ------------------------------------------ |
| フロント     | Next.js 15.0.3 / React 19.1.0 / TypeScript 5.0.0 | SSR 対応・保守性が高く、情報も豊富         |
| バックエンド | Express 5.1.0                                    | 柔軟な API 設計と構成が可能                |
| DB           | PostgreSQL 17.4                                  | トランザクション・リレーション管理に優れる |
| 認証         | Passport                                         | セッション管理により実運用に近い構成が可能 |
| 開発環境     | Docker（PostgreSQL のみ）                        | チーム開発を想定した環境再現性の確保       |
| インフラ     | AWS（EC2 / RDS / S3）                            | 実務に近いインフラ構成で運用経験を獲得     |
| UI           | MUI                                              | デザインの統一とレスポンシブ対応           |
| データ取得   | SWR                                              | キャッシュ戦略による高速化                 |
| その他       | ESLint / Prettier / Zod / RHF                    | 品質・開発効率・UX を向上                  |

---

## ✨ 技術的ハイライト・工夫点

### 🧱 アーキテクチャ設計

- Express で **レイヤードアーキテクチャ**（Presentation / application / domain / infrastructure）を採用し、責務分離を明確化
- 型安全性を保つため、独自の型定義を`models`や`dto`、 `@types` に集約

### 🔐 認証戦略

- **User / Company** 両方で Passport の戦略を分離
- `serializeUser` / `deserializeUser` でセッションを分けて運することでユーザー種別を管理

### 🚀 パフォーマンス最適化

- SSR（Server Side Rendering）＋ SWR キャッシュにより初期表示速度を最適化
- カート情報は **DB にも保存**し、複数デバイス対応を実現

### 🎨 UI/UX 配慮

- RHF + Zod によるバリデーションとリアルタイム UX 向上
- Drawer / Modal によるページ遷移最小化設計
- トランザクション設計（ロールバック処理含む）

### ⚠️ エラー・例外処理

- React のエラーバウンダリ導入、Custom Hook による例外処理
- バックエンドでは Logger（console 出力）でエラー管理を明確化

---

## セットアップ手順

このプロジェクトは、フロントエンドとバックエンドを含むポートフォリオアプリケーションです。以下の手順に従って環境をセットアップしてください。

### フロントエンドの立ち上げ方

1. 必要な依存関係をインストールします:
   ```bash
   cd next.js
   npm install
   ```
2. 開発サーバを起動します:
   ```bash
   npm run dev
   ```
3. ブラウザで以下の URL を開きます:
   ```
   http://localhost:3000
   ```

---

### バックエンドサーバの立ち上げ方

1. 必要な依存関係をインストールします:
   ```bash
   cd express
   npm install
   ```
2. 環境変数を設定します（`.env.example`ファイルから`.env`ファイルを作成し、以下のように記載してください）:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=portfolio
   DB_USER=[your username]  # デフォルトは "guest"
   DB_PASSWORD=[your password]  # デフォルトは "guest"
   ```
3. サーバを起動します:
   ```bash
   npm run dev
   ```
4. サーバが起動していることを確認します:
   ```
   http://localhost:3001
   ```

### PostgreSQL の構築手順

#### Docker を使用した簡単な構築方法

1. Docker がインストールされていない場合は、[公式サイト](https://www.docker.com/)からインストールしてください。
2. プロジェクトルートに以下のファイルを作成します:

   - **Dockerfile**

     ```dockerfile
     FROM postgres:17.4

     COPY ./db /docker-entrypoint-initdb.d/
     ```

   - **docker-compose.yml**
     ```yaml
     version: "3.9"
     services:
       pgsql_db:
         build: .
         image: my-postgres:17.4
         container_name: my_portfolio_db
         restart: always
         ports:
           - "${DB_PORT}:5432"
         environment:
           POSTGRES_USER: ${DB_USER}
           POSTGRES_PASSWORD: ${DB_PASSWORD}
           POSTGRES_DB: ${DB_NAME}
         volumes:
           - db_data:/var/lib/postgresql/data
           - ./db:/docker-entrypoint-initdb.d
     volumes:
       db_data:
     ```

3. 以下のコマンドを実行してコンテナを起動します:
   ```bash
   docker-compose up -d
   ```
4. PostgreSQL が起動していることを確認します:

   ```bash
   docker ps
   ```

   `my_portfolio_db` コンテナがリストに表示されていれば成功です。

5. サーバを停止します:

   ```bash
   docker-compose down
   ```

   `my_portfolio_db` コンテナがリストに表示されていないことを確認して下さい。

---

#### 手動で構築する場合

1. PostgreSQL をインストールします（未インストールの場合）。
   - macOS の場合:
     ```bash
     brew install postgresql
     ```
2. PostgreSQL サービスを起動します:
   ```bash
   brew services start postgresql
   ```
3. データベースとテーブルを作成します:
   ```sql
   CREATE TABLE IF NOT EXISTS companies (
     company_id SERIAL PRIMARY KEY,
     company_name VARCHAR(255) NOT NULL UNIQUE,
     company_password VARCHAR(255) NOT NULL,
     company_created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
     company_updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
   );
   CREATE TABLE session (
     sid VARCHAR NOT NULL PRIMARY KEY,
     sess JSON NOT NULL,
     expire TIMESTAMP NOT NULL,
     type VARCHAR NOT NULL DEFAULT 'company'
   );
   ```

---

### 確認方法

1. フロントエンドとバックエンドが正常に動作していることを確認します。
2. PostgreSQL に接続し、データが正しく保存されていることを確認します:
   ```bash
   psql -U pgsql_db -d portfolio
   SELECT * FROM companies;
   ```

---
