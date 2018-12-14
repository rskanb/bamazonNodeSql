--Below two line commented out to avoid accidents of dropping database
--DROP DATABASE IF EXISTS bamazon;
--CREATE DATABASE bamazon;

USE bamazon;

--Product table 
CREATE TABLE product(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    price INT NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO product(product_name, department_name, price, stock_quantity) 
VALUES ("samsungS8", "cellphone", 500, 100), ("sonyEricsson", "cellphone", 200, 1000);

-- New Department Table Created 
CREATE TABLE department (
    department_id INTEGER NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(30) NOT NULL,
    over_head_costs INTEGER NULL,
    PRIMARY KEY(department_id)
);
INSERT INTO department(department_name, over_head_costs) 
VALUES ("cellphone", 5000), ("laptops", 0),("Electronics", 1000000);

--Adding New Column to product_sales to product table using ALTER command 
ALTER TABLE product ADD product_sales INT;

UPDATE product SET product_sales = 0 WHERE item_id = 0;