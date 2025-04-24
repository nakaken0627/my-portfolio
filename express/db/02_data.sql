set client_encoding = 'UTF8';

INSERT INTO companies (name, password) VALUES
('test','$2b$12$PxTKfG6oLgpMyCnsBAL1YuS1q/UltDnRPWsDiUVuWvKoLeCR3UQIO'), --ハッシュ化前のPW：test
('a','$2b$12$Yff5Q9lzma7PnGk16K8xHu0XeR2zNVEfGXwqnSrOqw5g1Fi.rvQj6'), --ハッシュ化前のPW：12345
('b','$2b$12$noG404YnA8SovqIJ6oc5NeLoYm.NUVjSun.jaOmLjc93wC4L6uILW'), --ハッシュ化前のPW：12345
('c','$2b$12$lk3bnxUtj0y7dRrCWGz.v.20Tp98jOs5Z.UtZLQdCoozoqt88OXW6'); --ハッシュ化前のPW：12345

INSERT INTO users (name, password) VALUES
('test','$2b$12$/tcIMCgw.IgATlLlDD0bJ.ZRCW6KD1q1bvwRlBuPxVrWgDixnoh7K'), --ハッシュ化前のPW：test
('a','$$2b$12$0KS/yIj7MS7pn889KZsgpOiFWxp//FSdYsZGKnHprUafq40fodX3e'), --ハッシュ化前のPW：12345
('b','$2b$12$yTgbjAqRqNiA.vNZhd0W9OtunHHd5xt7U0FnAmRKNnoM5kpG34Zju'), --ハッシュ化前のPW：12345
('c','$2b$12$fOXpjcaE2PgBWwifxjZbaeGB/dlXKiROiaEFb/F/YkSiP16l3eOvO'); --ハッシュ化前のPW：12345

INSERT INTO products (company_id, model_number, name, price, description) VALUES
(1, 'TW-1001', 'ルーター', 12800.00, '高速インターネット向けルーター'),
(1, 'TW-2002', 'ネットワークスイッチ', 7400.00, 'ギガビット対応のネットワークスイッチ'),
(1, 'GF-330', '電気ケトル', 3600.00, '省エネ設計の電気ケトル'),
(1, 'GF-991', '太陽光充電器', 5800.00, 'ポータブル太陽光充電器'),
(1, 'CR-01', 'LED電球', 1200.00, 'Bluetooth対応のスマート電球'),
(2, 'CR-07', 'エアフィルター', 9200.00, 'PM2.5対応の空気清浄フィルター'),
(2, 'NS-900', 'ToDo管理ソフト', 2400.00, 'ToDo管理アプリ（ソフトウェアライセンス）'),
(2, 'NS-777', '時間管理ソフト', 1800.00, '時間管理ツール（クラウド対応）'),
(2, 'AQ-10X', '浄水器', 15800.00, '家庭用浄水器'),
(2, 'AQ-22W', 'クリーナーボトル', 950.00, '霧吹き式クリーナーボトル');