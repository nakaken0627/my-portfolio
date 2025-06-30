set client_encoding = 'UTF8';

INSERT INTO companies (name, password) VALUES
('test','$2b$12$PxTKfG6oLgpMyCnsBAL1YuS1q/UltDnRPWsDiUVuWvKoLeCR3UQIO'), --ハッシュ化前のPW：test
('company_a','$2b$12$Yff5Q9lzma7PnGk16K8xHu0XeR2zNVEfGXwqnSrOqw5g1Fi.rvQj6'), --ハッシュ化前のPW：12345
('company_b','$2b$12$noG404YnA8SovqIJ6oc5NeLoYm.NUVjSun.jaOmLjc93wC4L6uILW'), --ハッシュ化前のPW：12345
('company_c','$2b$12$lk3bnxUtj0y7dRrCWGz.v.20Tp98jOs5Z.UtZLQdCoozoqt88OXW6'); --ハッシュ化前のPW：12345

INSERT INTO users (id,name, password) VALUES
(0,'dummy','$2b$12$sz.2kHVUsQ3wjT.osC3PRu6PmZpL0M7wkz8Nur6VtEifv942HhdNO'), --ハッシュ化前のPW：dummy
(1,'test','$2b$12$/tcIMCgw.IgATlLlDD0bJ.ZRCW6KD1q1bvwRlBuPxVrWgDixnoh7K'), --ハッシュ化前のPW：test
(2,'user_a','$2b$12$0KS/yIj7MS7pn889KZsgpOiFWxp//FSdYsZGKnHprUafq40fodX3e'), --ハッシュ化前のPW：12345
(3,'user_b','$2b$12$yTgbjAqRqNiA.vNZhd0W9OtunHHd5xt7U0FnAmRKNnoM5kpG34Zju'), --ハッシュ化前のPW：12345
(4,'user_c','$2b$12$fOXpjcaE2PgBWwifxjZbaeGB/dlXKiROiaEFb/F/YkSiP16l3eOvO'); --ハッシュ化前のPW：12345

INSERT INTO products (company_id, model_number, name, price, description,image_name) VALUES
(1, 'TW-1001', 'ルーター', 12800.00, '高速インターネット向けルーター','8e50b833b0ed1ab69dd5d7a736315c56e4fe1b7b7bb190a1d98792cc95e8fd91'),
(1, 'TW-2002', 'ネットワークスイッチ', 7400.00, 'ギガビット対応のネットワークスイッチ','1a0e7da3ca6c523fbc0c147fb813b48e0323ef697fbc3bdb70cae5a8a509737f'),
(1, 'GF-330', '電気ケトル', 3600.00, '省エネ設計の電気ケトル','513e9b8374e4dd5bdb7c27fb8b654664180b0b61bafbdb032120f6c55ecfce0e'),
(1, 'GF-991', '太陽光充電器', 5800.00, 'ポータブル太陽光充電器','423676ee2523ff13f557b5f5403b7a8c30b1a0e895c34c7e276880669066c328'),
(1, 'CR-01', 'LED電球', 1200.00, 'Bluetooth対応のスマート電球','ea1765590a1ca2be2d7ef330dff0e79483d25c50e5c964400989a86ada93546c'),
(2, 'CR-07', 'エアフィルター', 9200.00, 'PM2.5対応の空気清浄フィルター','e6309f3478247e2ecb5af33a25df4c97955f5e4872e1e1d41576e8c6d14f5c4f'),
(2, 'NS-900', 'ToDo管理ソフト', 2400.00, 'ToDo管理アプリ（ソフトウェアライセンス）',null),
(2, 'NS-777', '時間管理ソフト', 1800.00, '時間管理ツール（クラウド対応）',null),
(2, 'AQ-10X', '浄水器', 15800.00, '家庭用浄水器',null),
(2, 'AQ-22W', 'クリーナーボトル', 950.00, '霧吹き式クリーナーボトル',null);

-- 共通品(マスタデータ)のサンプル
INSERT INTO products
(product_id, user_id, price, description, name, model_number)
VALUES
(1, 0, 12800.00, '高速インターネット向けルーター', 'ルーター', 'TW-1001'),
(2, 0, 7400.00, 'ギガビット対応のネットワークスイッチ', 'ネットワークスイッチ', 'TW-2002'),
(3, 0, 3600.00, '省エネ設計の電気ケトル', '電気ケトル', 'GF-330'),
(4, 0, 5800.00, 'ポータブル太陽光充電器', '太陽光充電器', 'GF-991'),
(5, 0, 1200.00, 'Bluetooth対応のスマート電球', 'LED電球', 'CR-01'),
(6, 0, 9200.00, 'PM2.5対応の空気清浄フィルター', 'エアフィルター', 'CR-07'),
(7, 0, 2400.00, 'ToDo管理アプリ（ソフトウェアライセンス）', 'ToDo管理ソフト', 'NS-900'),
(8, 0, 1800.00, '時間管理ツール（クラウド対応）', '時間管理ソフト', 'NS-777'),
(9, 0, 15800.00, '家庭用浄水器', '浄水器', 'AQ-10X'),
(10, 0, 950.00, '霧吹き式クリーナーボトル', 'クリーナーボトル', 'AQ-22W');

-- 個別品のサンプル
INSERT INTO product_customizations
(product_id, user_id, price, description, start_date, end_date, name, model_number)
VALUES
(1, 1, 10000.00, '【〇〇様向け】専用ルーター', '2025-04-01', '2025-06-01', 'ルーター', 'TW-1001-01'),
(2, 1, 7000.00, '【特別単価】ギガビット対応のネットワークスイッチ', '2025-05-01', '2026-05-10', 'ネットワークスイッチ', 'TW-2002-01'),
(3, 1, 3500.00, '【仕様変更】電気ケトル', '2025-06-01', '2025-12-31', '電気ケトル', 'GF-330-01'),
(4, 2, 5000.00, '【特別単価】ポータブル太陽光充電器', '2024-12-01', '2025-10-15', '太陽光充電器', 'GF-991-01'),
(5, 2, 1500.00, '【特別仕様】スマート電球（付属品付き）', '2025-05-16', '2025-07-01', 'LED電球', 'CR-01-01'),
(6, 1, 8900.00, '[特別単価]PM2.5対応の空気清浄フィルター', '2025-03-01', '2025-04-15', 'エアフィルター', 'CR-07-001'),
(7, 1, 2000.00, '[〇〇様]ToDo管理アプリ', '2025-05-20', '2025-10-01', 'ToDo管理ソフト', 'NS-900-001'),
(8, 2, 1800.00, '[仕様変更]]時間管理ツール v2.0', '2025-05-01', '2026-05-16', '時間管理ソフト', 'NS-777-001'),
(9, 2, 17000.00, '[特別単価]家庭用浄水器', '2025-01-01', '2025-12-31', '浄水器', 'AQ-10X-001'),
(10, 2, 900.00, '[仕様変更]霧吹き式クリーナーボトル ', '2025-07-01', '2025-07-31', 'クリーナーボトル', 'AQ-22W-001');