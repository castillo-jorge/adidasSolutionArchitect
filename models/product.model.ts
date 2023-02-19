
let productModel = {
    /** Get the review of a product with productID = id
     * 
     * @param app The express app object
     * @param id The productID key value to search in DB
     * @param callback The function called after retrieving the data
     */
    getProduct: function (app: any, id: string, callback: CallableFunction) {

        let productsCollection = productModel._getProductsCollection(app);

        debugger;

        productsCollection.findOne({ "productID": id }, (err: Error, result: any) => {
            debugger;
            if (err === null) {
                if (result) {
                    //found one item... returning to controller
                    callback(null, result);
                }
                else {
                    //no item found... return not found
                    let e = new Error("Not found");
                    e.name = "404";
                    callback(e, undefined);
                }
            }
            else {
                //any other problem
                //TODO: create a helper to centralize error management for all data calls
                let e = new Error("Unexpected error");
                e.name = "500";
                callback(e, undefined);
            }
        });

    },

    /**
     * @private
     * 
     * @param app The express app object
     * @returns The DB object for this model
     */
    _getProductsCollection: function (app: any): any {
        let myDB = app.get("productDB");
        return myDB.collection("products");
    }
}


//export only public methods for this module
let exportProductModel = {
    getProduct: productModel.getProduct,
}

module.exports = exportProductModel;

