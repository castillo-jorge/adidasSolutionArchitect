
let reviewModel = {
    /** Get the review of a product with productID = id
     * 
     * @param app The express app object
     * @param id The productID key value to search in DB
     * @param callback The function called after retrieving the data
     */
    getReview: function (app: any, id: string, callback: CallableFunction) {

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
    deleteReview: function (app: any, id: string, callback: CallableFunction) {
        let reviewDB = reviewModel._getmyDB(app);

        reviewDB.run(
            "DELETE FROM review WHERE productID=(?)",
            id,
            function (this: any, err: Error) {
                debugger;
                if (err !== null) {
                    //any other problem
                    //TODO: create a helper to centralize error management for all data calls
                    let e = new Error("Unexpected error");
                    e.name = "500";
                    callback(e);
                }
                else {
                    if (!this.changes) {
                        //no operations done...
                        let e = new Error("Not found");
                        e.name = '404';
                        callback(e);

                    }
                    else {
                        //everything OK
                        callback(null);
                    }

                }
            });

    },

    createReview: function (app: any, id: string, payload: any, callback: CallableFunction) {
        let reviewDB = reviewModel._getmyDB(app);

        reviewDB.run("INSERT INTO review (productID, AvgReviews, NumReviews) VALUES ($productID, $AvgReviews, $NumReviews)",
            {
                $productID: id,
                $AvgReviews: payload.AvgReviews,
                $NumReviews: payload.NumReviews
            },
            function (this: any, err: Error) {
                if (err === null && this.changes) {
                    //everything OK
                    callback(null);
                }
                else {
                    //TODO: check error response and send better error description back to controller...
                    let e = new Error("Unexpected error");
                    e.name = "500";
                    callback(e);
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
    deleteReview: reviewModel.deleteReview,
    createReview: reviewModel.createReview
}

module.exports = exportReview;

