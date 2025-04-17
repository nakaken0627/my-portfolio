# My Portfolio

このプロジェクトは、フロントエンドとバックエンドを含むポートフォリオアプリケーションです。以下の手順に従って環境をセットアップしてください。

---

## セットアップ手順

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
