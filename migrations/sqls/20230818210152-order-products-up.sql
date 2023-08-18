CREATE TABLE order_products(
    id SERIAL PRIMARY KEY,
    products_id INTEGER REFERENCES products(id) NOT NULL,
    order_id INTEGER REFERENCES orders(id) NOT NULL,
    quantity INTEGER NOT NULL
);