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

INSERT INTO products (company_id, model_number, name, default_price, description) VALUES
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

-- 共通品(マスタデータ)のサンプル
INSERT INTO public.custom_products
(product_id, user_id, is_default, custom_price, custom_description, custom_product_name, custom_model_number)
VALUES
(1, 0, true, 12800.00, '高速インターネット向けルーター', 'ルーター', 'TW-1001'),
(2, 0, true, 7400.00, 'ギガビット対応のネットワークスイッチ', 'ネットワークスイッチ', 'TW-2002'),
(3, 0, true, 3600.00, '省エネ設計の電気ケトル', '電気ケトル', 'GF-330'),
(4, 0, true, 5800.00, 'ポータブル太陽光充電器', '太陽光充電器', 'GF-991'),
(5, 0, true, 1200.00, 'Bluetooth対応のスマート電球', 'LED電球', 'CR-01'),
(6, 0, true, 9200.00, 'PM2.5対応の空気清浄フィルター', 'エアフィルター', 'CR-07'),
(7, 0, true, 2400.00, 'ToDo管理アプリ（ソフトウェアライセンス）', 'ToDo管理ソフト', 'NS-900'),
(8, 0, true, 1800.00, '時間管理ツール（クラウド対応）', '時間管理ソフト', 'NS-777'),
(9, 0, true, 15800.00, '家庭用浄水器', '浄水器', 'AQ-10X'),
(10, 0, true, 950.00, '霧吹き式クリーナーボトル', 'クリーナーボトル', 'AQ-22W');

-- 個別品のサンプル
INSERT INTO public.custom_products
(product_id, user_id, is_default, custom_price, custom_description, start_date, end_date, custom_product_name, custom_model_number)
VALUES
(1, 1, false, 10000.00, '【〇〇様向け】専用ルーター', '2025-04-01', '2025-06-01', 'ルーター', 'TW-1001-01'),
(2, 1, false, 7000.00, '【特別単価】ギガビット対応のネットワークスイッチ', '2025-05-01', '2026-05-10', 'ネットワークスイッチ', 'TW-2002-01'),
(3, 1, false, 3500.00, '【仕様変更】電気ケトル', '2025-06-01', '2025-12-31', '電気ケトル', 'GF-330-01'),
(4, 2, false, 5000.00, '【特別単価】ポータブル太陽光充電器', '2024-12-01', '2025-10-15', '太陽光充電器', 'GF-991-01'),
(5, 2, false, 1500.00, '【特別仕様】スマート電球（付属品付き）', '2025-05-16', '2025-07-01', 'LED電球', 'CR-01-01'),
(6, 1, false, 8900.00, '[特別単価]PM2.5対応の空気清浄フィルター', '2025-03-01', '2025-04-15', 'エアフィルター', 'CR-07-001'),
(7, 1, false, 2000.00, '[〇〇様]ToDo管理アプリ', '2025-05-20', '2025-10-01', 'ToDo管理ソフト', 'NS-900-001'),
(8, 2, false, 1800.00, '[仕様変更]]時間管理ツール v2.0', '2025-05-01', '2026-05-16', '時間管理ソフト', 'NS-777-001'),
(9, 2, false, 17000.00, '[特別単価]家庭用浄水器', '2025-01-01', '2025-12-31', '浄水器', 'AQ-10X-001'),
(10, 2, false, 900.00, '[仕様変更]霧吹き式クリーナーボトル ', '2025-07-01', '2025-07-31', 'クリーナーボトル', 'AQ-22W-001');