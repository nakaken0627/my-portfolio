CREATE UNIQUE INDEX cart_products_unique
ON cart_products(cart_id, product_id, customization_id)
NULLS NOT DISTINCT;