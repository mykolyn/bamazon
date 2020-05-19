var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;

  queryProductList();
});

var customer = {
  item_id: 0,
  customer_order: 0
};

function queryProductList() {
  connection.query("SELECT * FROM products", function(err, res) {
    console.log("Welcome, here are the products we are selling:");
    for (var i = 0; i < res.length; i++) {
      console.log(
        res[i].item_id +
          " | " +
          res[i].product_name +
          " | " +
          res[i].department_name +
          " | " +
          res[i].stock_quantity
      );
    }
    console.log("-----------------------------------");
    userInput();
  });
}

function checkStock(id) {
  connection.query(
    "SELECT stock_quantity FROM products WHERE item_id = ?",
    id,
    function(err, res) {
      for (var i = 0; i < res.length; i++) {
        var cureentStock = res[i].stock_quantity;
      }
      if (cureentStock >= customer.customer_order) {
        console.log("Thank you for your purchase");

        updateInventory(customer.item_id, customer.customer_order, cureentStock);
      } else if (cureentStock < customer.customer_order) {
        console.log("Sorry, we are out of stock");
        userInput();
      }
    }
  );
}

function updateInventory(item_id, customer_order, cureentStock) {
    var newStock = cureentStock - customer_order;
    connection.query("UPDATE products SET stock_quantity="+newStock+" WHERE item_id="+item_id, function(err, res) {
        if (err) throw err;
        
        console.log("Item "+item_id+" stock updated to "+newStock);
        queryProductList();
    });
}

function userInput() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the ID of the product you would like to buy?",
        name: "item_id"
      },
      {
        type: "input",
        message:
          "How many would you like to buy?",
        name: "customer_order"
      }
    ])
    .then(function(response) {
      customer.item_id = response.item_id;
      customer.customer_order = response.customer_order;

      checkStock(response.item_id);
    });
}
