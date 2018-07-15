DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;
USE bamazon_DB;


CREATE TABLE products (
-- The unique id for each product
item_id INTEGER NOT NULL AUTO_INCREMENT,

-- The name of the product
product_name VARCHAR(100) NOT NULL,

-- The name of the department where the product is located
department_name VARCHAR(100) NOT NULL,

-- The price of the product being sold
price DECIMAL(10,2) NOT NULL,

-- The amount (quantity) of product in stock
stock_quantity INTEGER(11) NOT NULL,

-- The amount (sales) of the product sold
product_sales DECIMAL(10,2) NOT NULL,

-- Sets the primary key as the item_id
PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Coleman Sundome 4-Person Tent", "Outdoor Recreation", 65.86, 33, 0),
("Vont 4 Pack LED Camping Lantern", "Outdoor Recreation", 22.99, 1, 0),
("Kelty Cosmic 0 Degree Sleeping Bag", "Sports and Outdoors", 197.96, 16, 0),
("Teton Sports Scout 3400 Internal Frame Backpack", "Sports and Outdoors", 69.11, 4, 0),
("Merrell Women's Siren Edge Hiker Shoes", "Sports and Outdoors", 74.95, 1, 0),
("Coleman Instant Screenhouse, 10 x 10 Feet", "Sports and Outdoors", 63.51, 36, 0),
("Coleman Classic Propane Stove", "Sports and Outdoors", 32.99, 62, 0),
("Gold Armour 17Pcs Camping Cookware Mess Kit", "Sports and Outdoors", 24.99, 1, 0),
("ALPS Mountaineering Rendezvous Folding Camp Chair", "Sports and Outdoors", 40.78, 5, 0),
("Winner Outfitters Double Camping Hammock", "Sports and Outdoors", 26.99, 3, 0);

CREATE TABLE departments (
	-- Unique id for each department 
    department_id INT(11) AUTO_INCREMENT NOT NULL,
    -- Name of department --
	department_name VARCHAR(100) NOT NULL,
    -- A dummy number placed for each department 
	over_head_costs VARCHAR(100) NOT NULL,
	PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Outdoor Clothing", 20000),
("All Sports and Fitness", 260000),
("Water Sports", 920000),
("Camping and Hiking", 34150),
("All Outdoor Recreation", 77000),
("Exercise and Fitness", 89000);

SELECT DISTINCT departments.department_id, departments.department_name, 
departments.over_head_costs, SUM(products.product_sales) as department_sales
FROM departments
INNER JOIN products ON (departments.department_name = products.department_name)
GROUP BY department_name
ORDER BY department_sales desc;

SELECT department_name, SUM(product_sales) as department_sales 
FROM  products 
GROUP BY department_name;

DELETE FROM products WHERE item_id=23;

DELETE FROM departments WHERE department_id=12 OR department_id=13;