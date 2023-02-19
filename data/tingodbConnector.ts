const tingodb = require('tingodb')();
var productsDB = new tingodb.Db('data/tingoDB/', {});

if (!productsDB) {
    console.log("Error connecting to products database");
}
else {
    console.log("Connected to products database succesfully");
}

/***************************************************************************
 * HARDCODED: Just for easy testing with fresh data
 */

// Refresh products data everytime app is restarted: uncomment next lines
/*

let productsCollection = productsDB.collection("products");
productsCollection.drop((err: Error, delOK: boolean) => {
    console.log("Products Collection deleted");
    console.log("Start inserting fresh data into products collection");
    productsCollection = productsDB.collection("products", (error: Error, isOK: boolean) => {
        debugger;
        if (error) throw error;
        var productsObj = [
            { "productID": "AB1234", "category": "football t-shirt", "colour": "red", "team": "Real Zaragoza", "size": "XL", "unitsAvailable": 10 },
            { "productID": "BC2345", "category": "goalkeeper gloves", "colour": "navy", "size": "10", "unitsAvailable": 1 },
            { "productID": "CD3456", "category": "shoes", "colour": "white", "sport": "tennis", "size": "43 1/3", "unitsAvailable": 0 },
            { "productID": "DE4567", "category": "shoes", "colour": "balck", "sport": "basketball", "size": "42 2/3", "unitsAvailable": 1 }
        ];
        productsCollection.insert(productsObj, { w: 1 }, (err: Error, res: any) => {
            debugger;
            if (err) throw err;
            console.log("Number of products inserted: " + res.insertedCount);
        });
    });

    
});
// end lines to uncomment to refresh products data

*/



module.exports = productsDB;