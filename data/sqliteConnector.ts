const sqlite3 = require('sqlite3').verbose();
var reviewDB = new sqlite3.Database('data/review.sqlite', sqlite3.OPEN_READWRITE, function (err: Error) {
    if (err) {
        console.log(err.message)
    }
    else {
        console.log("Connected to review database succesfully");
    }
});


module.exports = reviewDB;