//Install the inquirer npm package.
var inquirer = require("inquirer");

//Install and require the mysql npm package to make the connection to mysql database.
var mysql = require("mysql");

//Read and sets the environment variables with the dotenv package.
require("dotenv").config();


var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3307,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon_DB"
});


//Created function that allows shoppers to browse and purchase items from the bamazon store.
function showCustomerScreen() {
    console.log("Welcome to Bamazon Outdoor Living!");
    //Use inquirer to prompt the shopper to see what sale items are on sale today.
    var saleItems = [
        {
            type: 'confirm',
            name: 'seeSaleItems',
            message: 'Do you want to see what is on sale today?',
            default: true
        }
    ];

    inquirer.prompt(saleItems).then(answers => {
        //If the shopper confirms and wants to see sale items
        if (answers.seeSaleItems) {
            //then show list of sale items and prices.
            showItemsForSale();
        }

        //If shopper decides they don't want to shop then exit
        else {
            console.log("Thanks for shopping with Bamazon Outdoor Living!");
            connection.end();
            return;
        }
    });
}

//Created this function to allow shopper to see all products on sale and cost.
function showItemsForSale() {
    //Create a connection query to the database.
    //Select all columns from products table to get product info.
    connection.query("SELECT * FROM products", function (err, res) {
        //If there is an error, throw error.
        if (err) throw err;

        //Use inquirer to prompt shopper to select a department
        //console.log(res);
        var chooseDepartment = [
            {
                type: 'list',
                name: 'productDepartment',
                message: 'Select a department',
                choices: function () {
                    var departmentsArray = [];
                    for (var i = 0; i < res.length; i++) {
                        departmentsArray.push(res[i].department_name);
                    }
                    return departmentsArray;
                }
            }
        ];
        //After shopper selects department.
        inquirer.prompt(chooseDepartment).then(answers => {
            var customerDept = answers.productDepartment;
            //Search the database for only the items in the department that the shopper selected.
            connection.query("SELECT * from products WHERE ?",
                {
                    department_name: customerDept
                },
                function (err, res) {
                    if (err) {
                        console.log("error: " + err);
                    }
                    //console.log(res);
                    //Show only the items in the department that the shopper selected.
                    //Display item number, item, price, and number remaining information that is stored in the products table in the db.
                    console.log("Items for sale");
                    console.log("Department: " + customerDept);
                    for (var i = 0; i < res.length; i++) {
                        var items =
                            "====================================" + "\r\n" +
                            "Item number: " + res[i].item_id + "\r\n" +
                            "Item: " + res[i].product_name + "\r\n" +
                            "Price: $" + res[i].price + "\r\n" +
                            "Number remaining: " + res[i].stock_quantity + "\r\n" +
                            "====================================="
                        console.log(items);
                    }
                    //After shopper has a chance to look over the items, ask them if they want to buy something today.
                    buyItemOrLeave();
                }
            );
        });
    });
}

//Create function to allow shopper to buy something from the store.
function buyItemOrLeave() {
    //Use inquire to ask shopper if they want to buy something from the list.
    var buyItem = [
        {
            type: 'list',
            name: 'readyToBuy',
            message: 'What do you want to do?',
            choices: ['Make a purchase', 'Select another department', 'Exit store']
        }
    ];

    inquirer.prompt(buyItem).then(answers => {
        //If the shopper confirms they want to purchase an item
        //Then, use inquirer will prompt them for the item number of the product they want to buy.
        if (answers.readyToBuy === 'Make a purchase') {
            console.log("What would you like to buy?");
            console.log("Enter the item number of the item that you would like to buy.");
            selectItem();
        }

        //If shopper selects 'Select another department', go back to the list of departments.
        else if (answers.readyToBuy === 'Select another department') {
            showItemsForSale();
        }

        else {
            //If the user decides they don't want to buy anything, exit application.
            console.log("Thanks for shopping with us! Come back soon!");
            //End database connection.
            connection.end();
            return;
        }
    });
}

//Create function to allow shopper to select the product they want to purchase and how many.
function selectItem() {
    //Create a connection query to the database.
    //Select all columns from the products table to get product info.
    connection.query("SELECT * FROM products", function (err, res) {
        //If there is an error, throw error.
        if (err) throw err;

        //To make purchase, prompt user for item number and quantity.
        var selectItem = [
            {
                type: 'text',
                name: 'itemNumber',
                message: 'Enter item number: ',
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }

            },
            {
                type: 'text',
                name: 'howMany',
                message: 'How many would you like to buy?',
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ];


        inquirer.prompt(selectItem).then(answers => {
            //console.log(res);
            //console.log("User entered: " + answers.itemNumber);
            //Create variable that will hold the item the shopper selects and wants to purchase.
            var customerItem;
            //This array will hold all the possible item numbers in the store.
            var availableItemNumbers = [];
            //Push the item ids from the products table in the database to the availableItemNumbers array.
            for (var i = 0; i < res.length; i++) {
                availableItemNumbers.push(res[i].item_id);
                if (res[i].item_id === parseInt(answers.itemNumber)) {
                    customerItem = res[i];
                }
            }
            //console.log(availableItemNumbers);
            //console.log(customerItem);

            //If item number that user entered is invalid (does not exist in availableItemNumbers array),
            //Then, display error message that item number is not valid and return to the Home Screen.
            if (availableItemNumbers.indexOf(parseInt(answers.itemNumber)) === -1) {
                var invalidItemNumberError =
                    "==========================================================================================================" + "\r\n" +
                    "Item number " + answers.itemNumber + " was not found." + "\r\n" +
                    "Enter valid item number and try again." + "\r\n" +
                    "=========================================================================================================="
                console.log(invalidItemNumberError);
                //Return to Customer Home screen.
                setTimeout(showItemsForSale, 3000);
            }

            //If stock quantity is less than the quantity that the customer wants, 
            //notify customer that store doesn't have enough in stock right now.
            else if (customerItem.stock_quantity < answers.howMany) {
                console.log("Sorry, we have " + customerItem.stock_quantity + " left on stock right now.");
                console.log("Select a different amount or choose another item.");
                //Return to Customer Home screen.
                setTimeout(showItemsForSale, 2000);

            }

            //If the item number that the user entered is valid (exists in the availableItemNumbers array)
            //AND
            //If there is enough in stock right now, place order and charge customer for purchase.
            else if (availableItemNumbers.indexOf(parseInt(answers.itemNumber)) > -1 && customerItem.stock_quantity >= answers.howMany) {
                //Create variable to hold the number of items that the customer wants to purchase.
                var customerQuantity = answers.howMany;
                //Create variable that we can use to update product stock quantity in database.
                //Stock quantity equals current stock minus quantity customer purchased.
                var newQuantity = customerItem.stock_quantity - customerQuantity;
                //console.log("Updating quantity... \n" + newQuantity);
                //Create variable to calculate how much to charge customer.
                var customerTotal = customerItem.price * customerQuantity;
                //Create variable to update/calculate productSalesTotal based on customerTotal.
                var productSalesTotal = customerItem.product_sales + customerTotal;
                //Show the pending order information to customer before completing their order.
                var pendingOrderDetails =
                    "========================================================" + "\r\n" +
                    "Order details" + "\r\n" +
                    "Your item: " + customerItem.product_name + "\r\n" +
                    "Quantity: " + customerQuantity + "\r\n" +
                    "Your total is $" + customerTotal.toFixed(2) + "." + "\r\n" +
                    "========================================================"
                console.log(pendingOrderDetails);

                //Get confirmation from the shopper to place the order.
                var confirmOrder = [
                    {
                        type: 'confirm',
                        name: 'confirmOrder',
                        message: "Are you sure? Enter Y to confirm and complete order. Enter N to cancel.",
                        default: true
                    }
                ];

                inquirer.prompt(confirmOrder).then(answers => {
                    //If shopper confirms order, place order and update database.
                    if (answers.confirmOrder) {
                        //Create connection query to database. 
                        //Run UPDATE statement on products table to update product stock quantity in database for the specified item number.
                        var query = connection.query(
                            "UPDATE products SET ? WHERE ?",
                            [
                                {
                                    stock_quantity: newQuantity,
                                    product_sales: productSalesTotal
                                },
                                {
                                    item_id: customerItem.item_id
                                }
                            ],
                            function (err, res) {
                                //console.log("Item id: " + customerItem.item_id);
                                //console.log("quantity: " + newQuantity);
                            }
                        )
                        //Display order details and total amount that was charged to their Bamazon account.
                        console.log("Order complete");
                        console.log("Item ordered: " + customerItem.product_name);
                        console.log("Quantity: " + customerQuantity);
                        console.log("Your Bamazon account was charged $" + customerTotal.toFixed(2) + ".");
                        continueShopping();
                    }

                    //If customer cancels order...
                    else {
                        console.log("Order cancelled.");
                        setTimeout(continueShopping, 2000);
                    }
                })
            }
        });
    });
}

//Created function to ask shopper if they want to continue shopping after an order is placed (or cancelled).
function continueShopping() {
    var purchaseAnotherItem = [
        {
            type: 'confirm',
            name: 'continueToShop',
            message: 'Do you want to continue shopping? ',
            default: true
        }
    ];

    inquirer.prompt(purchaseAnotherItem).then(answers => {
        //If customer wants to continue to shop, show list of items for sale again.
        if (answers.continueToShop) {
            showItemsForSale();
        }

        else {
            //Exit application.
            console.log("Good bye! Have a fantastic day!");
            connection.end();
            return;
        }
    });

}
//Call function to display the shopper Portal.
showCustomerScreen();

