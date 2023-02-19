
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

            //Handle the response from DB
            if (err === null) {
                if (result) {
                    //we got a result
                    callback(null, result);
                }
                else {
                    //not found
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

        //sqlite seems to not throw error if delete operation is not matching any row... therefore
        //I run a get before delete to assure row exists (if not I will throw 404 error)

        reviewDB.get("SELECT productID FROM review WHERE productID=(?)", id, (getError: Error, result: object) => {
            if (getError !== null || result === undefined) {
                let e = new Error("Not found");
                e.name = '404';
                callback(e);
            }
            else {
                reviewDB.run("DELETE FROM review WHERE productID=(?)", id, (err: Error) => {
                    if (err !== null) {
                        //any other problem
                        //TODO: create a helper to centralize error management for all data calls
                        let e = new Error("Unexpected error");
                        e.name = "500";
                        callback(e);
                    }
                    else{
                        //everything OK
                        callback(null);
                    }
                });
            }
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

