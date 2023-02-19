const tingodb = require('tingodb')();
var productsDB = new tingodb.Db('data/tingoDB/', {});
debugger;
if (!productsDB) {
    console.log("Error connecting to products database");
}
else {
    console.log("Connected to products database succesfully");
}


module.exports = productsDB;