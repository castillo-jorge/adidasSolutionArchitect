const express = require('express');

let getReview = function (app: any, id: number, callback: CallableFunction) {

    let reviewDB = app.get("reviewDB");


    reviewDB.get("SELECT * FROM review WHERE productID= ?", id, (err: Error, result: object) => {
        debugger;
        if (err === null){
            callback(err, result);
        }
        
    });

}

module.exports = {
    getReview
}