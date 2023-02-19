const express = require('express');

let reviewModel = {
    /** Get the review of a product with productID = id
     * 
     * @param app The express app object
     * @param id The productID key value to search in DB
     * @param callback The function called after retrieving the data
     */
    getReview: function (app: any, id: number, callback: CallableFunction) {

        let reviewDB = reviewModel._getmyDB(app);


        reviewDB.get("SELECT * FROM review WHERE productID= ?", id, (err: Error, result: object) => {
            callback(err, result);
        });
    },

    /**
     * Delete the review of a product with productID = id
     * 
     * @param app The express app object
     * @param id The productID key value to search in DB
     * @param callback The function called after retrieving the data
     */
    deleteReview: function (app: any, id: number, callback: CallableFunction) {
        let reviewDB = reviewModel._getmyDB(app);

        reviewDB.run("DELETE FROM review WHERE productID= ?", id, (err: Error) => {
            callback(err)
        })
    },

    /**
     * @private
     * 
     * @param app The express app object
     * @returns The DB object for this model
     */
    _getmyDB: function (app: any): any {
        return app.get("reviewDB");
    }
}


//export only public methods for this module
let exportReview = {
    getReview: reviewModel.getReview,
    deleteReview: reviewModel.deleteReview
}

module.exports = exportReview;

