/*****************************************************************************************/
/* Products Review Microservice                                                                 */
/* Version 1.0                                                                           */
/*                                                                                       */
/*                                                                                       */
/*****************************************************************************************/

const express = require('express');
const router = express.Router();
import { Request, Response } from "express";


router.route("/")
    .get(function (req: Request, res: Response, next: CallableFunction) {
        res.json({"operation":"get"});
    })
    .put(function (req: Request, res: Response, next: CallableFunction) {
        res.json({"operation":"put"});
    })
    .post(function (req: Request, res: Response, next: CallableFunction) {
        res.json({"operation":"post"});
    })
    .delete(function (req: Request, res: Response, next: CallableFunction) {
        res.json({"operation":"delete"});
    })
    .all(function (req: Request, res: Response, next: CallableFunction) {
        // Empty response for all other verbs
        res.status(501).send();
    })


module.exports = router;