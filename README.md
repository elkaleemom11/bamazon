Overview:

In this activity, I created an Amazon-like storefront with the MySQL skills learned in class. The app will take in orders from customers and deplete stock from the store's inventory of 10 selected items in the "Outdoor Recreation" and "Sports and Outdoor" departments. 
About this project:

The project is a command line application built using the inquirer npm package, Node.js, Javascript, and a MySQL database, called "Bamazon". When the customer order is placed in the Customer Portal, the stock quantity for the product being purchased decreases by how much of that product the customer decides to buy.

Customer View - (See the schema.sql file for reference).

1. Created a MySQL Database called `bamazon`.

2. Created a Table inside of that database called `products`.

3. The products table has the following columns:

   * item_id (unique id for each product)
   * product_name (Name of product)
   * department_name
   * price (cost to customer)
   * stock_quantity (how much of the product is available in stores)


4. Populated this database with 10 different products. (i.e. Inserted "mock" data rows into this database and table).

5. Created a Node application called `bamazonCustomer.js`. Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.

6. The app will then prompt users with these messages:

   * Do you want to see what is on sale today?. (y/n)
   * Select a department. (Sports and Outdoors or Outdoor Recreation) and a list of items appear.
   * What do you want to do? Make a purchase? (y/n).
   * What would you like to buy?
   * Enter the item number.
   * How many would you like to buy?
   * Order details are shown (name of item purchased, number of items purchased, the amount, and total charge.)
   * Shopper is asked to confirm whether to continue shopping, or exit application.  If exit,
   the prompt returns by saying "Good bye! Have a fantastic day!"


7. Once the customer has placed the order, the node application will check if your store has enough of the product to meet the customer's request.

   * If the quantity is less than the quantity that the customer wants, then the customer
will be notified, to say the store doesn't have enough in stock right now. 

8. However, if the store _does_ have enough of the product, then the customer's order is fullfilled.
   * SQL database is then updated to reflect the remaining quantity.
   * Once the update goes through, the customer is shown the total cost of their purchase.

9. schema.sql: The database schema. The schema is what describes the structure of each table, and the datatypes that each column of the table contain. For this project, the database includes two tables, a products table and a departments table.

10. Screen shots and pictures from console and MySQL Work bench. (see readme.images folder): 
 
* departmentTable.csv (exported from DB into excel)
* NodeCommand.pdf
* ProductsandDepartments.pdf
* productsTable.csv (exported from DB into excel)

11. The products table contains information about each product that is sold in the store, including item number/id, product name, department name, price, stock quantity, and product sales.

Product Table:

item_id	product_name	department_name	price	stock_quantity	product_sales
1	Coleman Sundome 4-Person Tent	Outdoor Recreation	65.86	33	0
2	Vont 4 Pack LED Camping Lantern	Outdoor Recreation	22.99	1	0
3	Kelty Cosmic 0 Degree Sleeping Bag	Sports and Outdoors	197.96	16	0
4	Teton Sports Scout 3400 Internal Frame Backpack	Sports and Outdoors	69.11	4	0
5	Merrell Women's Siren Edge Hiker Shoes	Sports and Outdoors	74.95	1	0
6	Coleman Instant Screenhouse, 10 x 10 Feet	Sports and Outdoors	63.51	36	0
7	Coleman Classic Propane Stove	Sports and Outdoors	32.99	62	0
8	Gold Armour 17Pcs Camping Cookware Mess Kit	Sports and Outdoors	24.99	1	0
9	ALPS Mountaineering Rendezvous Folding Camp Chair	Sports and Outdoors	40.78	5	0
10	Winner Outfitters Double Camping Hammock	Sports and Outdoors	26.99	3	0

12. The department table contains information about the name of the department and the overhead cost which wasn't used in this activity.

Department Table:

1	Outdoor Clothing	20000
2	All Sports and Fitness	260000
3	Water Sports	920000
4	Camping and Hiking	34150
5	All Outdoor Recreation	77000
6	Exercise and Fitness	89000
		















		