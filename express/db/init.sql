set client_encoding = 'UTF8';

DROP TABLE IF EXISTS companies;

CREATE TABLE IF NOT EXISTS companies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE session (
    sid VARCHAR NOT NULL PRIMARY KEY,
    sess JSON NOT NULL,
    expire TIMESTAMP NOT NULL,
    type VARCHAR NOT NULL DEFAULT 'company'
);

-- ユーザー用テーブル
-- CREATE TABLE IF NOT EXISTS user (
--     user_id SERIAL PRIMARY KEY,
--     user_name VARCHAR(255) NOT NULL UNIQUE,
--     user_password VARCHAR(255) NOT NULL,
--     user_created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
--     user_updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
-- );

-- //ログイン機能の実装確認の際にadminユーザーを用意しておくために使用する予定
-- INSERT INTO users (username, password)
-- VALUES ('admin', '$2b$10$abc...hashed...')
-- ON CONFLICT (username) DO NOTHING;