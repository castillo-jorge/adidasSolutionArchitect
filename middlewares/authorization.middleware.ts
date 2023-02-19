import { Request, Response } from 'express';

let authMW = {
    /** Get the review of a product with productID = id
     * 
     */
    checkAuth: function (req: Request, res: Response, callback: CallableFunction) {
        const auth = { login: 'jcastillo', password: 'Start_123' };

        // parse login and password from headers
        const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
        const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')

        // Verify login and password are set and correct

        //TODO: Escape characters and Safe compare to avoid SQL injection and security topics

        if (login && password && login === auth.login && password === auth.password) {
            // Access granted...
            callback(null);
        }
        else {
            let authError = new Error("Authentication required");
            authError.name = "401";
            callback(authError);

        }
    }
}


//export only public methods for this module
let myExportModule = {
    checkAuth: authMW.checkAuth
}

module.exports = myExportModule;

