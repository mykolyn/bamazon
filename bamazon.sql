DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  stock_quantity INTEGER(10) NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, stock_quantity)
VALUES
 ("MacBook", "Electronics", 16), 
("TV", "Electronics", 50),
("iPad", "Electronics", 10),
("Drum Set", "Music", 17),
("Chair", "Furniture",6),
("Headphones", "Audio", 61),
("Wii", "Gaming", 32),
("Xbox", "Gaming", 13),
("T-Shirt", "Clothing", 19),
("Toaster", "Appliances", 25);

SELECT * FROM products;

