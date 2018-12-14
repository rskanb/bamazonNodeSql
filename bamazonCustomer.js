var inquirer = require("inquirer");
var mysql = require("mysql");


var connection = mysql.createConnection(
    {
        host: "localhost",
        port: 3306,
        user: "root",
        password: "berkeley",
        database: "bamazon"
    }
);

connection.connect(function(err){
    if(err) throw err;
    showItemData();
});

function showItemData(){
    connection.query(
        "SELECT * FROM product",
        function(err, results){
            if(err) throw err;
            console.log("id:\t\tProduct\t\tDepartment\t\tPrice\t\tQuantity");
            console.log("==============================================");
            for(let i = 0; i<results.length; i++){
                console.log(results[i].item_id +"\t\t"+ results[i].product_name +"\t\t"+
            results[i].department_name +"\t\t"+results[i].price +"\t\t"+results[i].stock_quantity);
            }  
            buyItem();
        }
    );
}

function buyItem(){
    inquirer.prompt([
        {   
            message: "Please enter an Id of the product you would like to buy",
            name: "buyId",
            type: "input",
            validate: function(value){
                if(!isNaN(parseInt(value))){
                    return true;
                }
                return "Please enter valid entry"
            }
        },
        {
            message: "How many unit needed ?",
            name: "quantity",
            type: "input",
            validate: function(value){
                if(!isNaN(parseInt(value))){
                    return true;
                }
                return "Please enter valid entry"
            }
        }
    ]).then(function(response){
        connection.query(
            "SELECT item_id, price, stock_quantity, product_sales FROM product WHERE item_id = ?"
            ,[response.buyId], 
            function(err, results){
                if(err) throw err;
                console.log(results[0].stock_quantity);
                console.log(results[0].product_sales);
                if(response.quantity < results[0].stock_quantity){
                    console.log(response.quantity);
                    console.log("");
                    connection.query("UPDATE product SET ?, ? WHERE ?", 
                    [
                        {
                            stock_quantity: (results[0].stock_quantity-response.quantity)
                        },
                        {
                            product_sales: results[0].product_sales + ((results[0].price) * response.quantity)
                        },
                        {
                            item_id:response.buyId
                        }
                    ], 
                    function(err){
                        if(err) throw err;
                        console.log(`Your total is $${(results[0].price) * response.quantity}`);
                    });
                    connection.end();
                }else{
                    console.log(`We are out of stock and have insufficient quantity!, please try again later`)
                    connection.end();
                }
        });
    });
};
