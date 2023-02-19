import { fetchJson } from "fetch-json";

let productModel = {
    /** Get the review of a product with productID = id
     * 
     * @param app The express app object
     * @param id The productID key value to search in DB
     * @param callback The function called after retrieving the data
     */
    getProduct: function (app: any, id: string, callback: CallableFunction) {

        //retrieve product from adidas API
        let URL: string = "https://adidas.co.uk/api/products/";

        fetch(URL + id)
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


    },

    getProductReview: function (app: any, id: string, callback: CallableFunction) {
        //retrieve data of reviews microservice
        let URL: string = "http://localhost:8080/review/"


        fetch(URL + id)
            .then(res => {
                debugger;
                if (res.status !== 200) {
                    res.json().then((data) => {
                        let e = new Error();
                        e.name = res.status.toFixed(0);
                        e.message = data.message ? data.message : data.error ? data.error : "Unexpected error";
                        callback(e, data);
                    });
                }
                else {
                    debugger;
                    res.json().then((data) => {
                        callback(null, data);
                    })
                }
            })
    }


}


//export only public methods for this module
let exportProductModel = {
    getProduct: productModel.getProduct,
    getProductReview: productModel.getProductReview
}

module.exports = exportProductModel;

