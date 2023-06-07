/* Replace with your SQL commands */

CREATE TABLE orders (id SERIAL PRIMARY KEY);

ALTER TABLE orders
    ADD user_id SERIAL,
   ADD CONSTRAINT fk_user_id
   FOREIGN KEY (user_id) 
   REFERENCES users(id);