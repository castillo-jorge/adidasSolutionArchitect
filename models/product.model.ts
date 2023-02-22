import { fetchJson } from "fetch-json";
import { Request } from "express";
import dotenv from 'dotenv';

dotenv.config();
const APIURL = process.env.APIURL;

let productModel = {

    /** Get the review of a product with productID = id
     * 
     * @param app The express app object
     * @param id The productID key value to search in DB
     * @param callback The function called after retrieving the data
     */
    getProduct: function (app: any, id: string, callback: CallableFunction) {

        //retrieve product from adidas API

        fetch(APIURL + id)
            .then(res => {
                if (res.status !== 200) {
                    res.json().then((data) => {
                        let e = new Error();
                        e.name = res.status.toFixed(0);
                        e.message = data.message ? data.message : "Unexpected error";
                        callback(e, data);
                    });
                }
                else {
                    res.json().then((data) => {
                        callback(null, data);
                    })
                }
            })
            .catch(err => {
                let e = new Error();
                e.name = "500";
                e.message = "Unexpected error";
                callback(e, undefined);
            })


    },

    getProductReview: function (req: Request, id: string, callback: CallableFunction) {
        //retrieve data of reviews microservice
        let protocol = req.secure ? "https://" : "http://";
        let host: string = req.header("host")!;
        let endpoint: string = "/review/";


        fetch(protocol + host + endpoint + id)
            .then(res => {
                if (!res.ok) {
                    res.json().then((data) => {
                        let e = new Error();
                        e.name = res.status.toFixed(0);
                        e.message = data.message ? data.message : data.error ? data.error : "Unexpected error";
                        callback(e, data);
                    });
                }
                else {
                    res.json().then((data) => {
                        callback(null, data);
                    })
                }
            })
            .catch(err => {
                let e = new Error();
                e.name = "500";
                e.message = "Unexpected error";
                callback(e, undefined);
            })

    }
}



//export only public methods for this module
let exportProductModel = {
    getProduct: productModel.getProduct,
    getProductReview: productModel.getProductReview
}

module.exports = exportProductModel;

