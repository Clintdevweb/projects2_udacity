/* Replace with your SQL commands */
CREATE TABLE order_products (id SERIAL PRIMARY KEY, quantity integer);
ALTER TABLE order_products ADD order_id SERIAL, 
    ADD CONSTRAINT fk_order_id 
    FOREIGN KEY (order_id) 
    REFERENCES orders(id),
    ADD product_id SERIAL,
    ADD CONSTRAINT fk_product_id
    FOREIGN KEY (product_id) 
    REFERENCES product(id);