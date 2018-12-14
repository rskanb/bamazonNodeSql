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


inquirer.prompt([
    {
      type: 'list',
      name: 'updatetable',
      message: 'What do you want to do?',
      choices: ['View Product Sales by Department','Create New Department']
    }
]).then(response => {
    switch(response.updatetable){
        case 'View Product Sales by Department':
        departmentView();
        break;
        case 'Create New Department':

        break;
    }
});

function departmentView(){
   var query = "SELECT department.department_id, department.department_name, department.over_head_costs, product.product_sales FROM department RIGHT JOIN product ON department.department_name = product.department_name"
   connection.query(query, function(err, res){
    //console.log(res);
    res.forEach(element => {
        console.log(element);
    })
   });
   connection.end();
}