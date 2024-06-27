const mongoose = require("mongoose");

const dbConnect = () => {
    mongoose.connect("mongodb://localhost:27017/paytm")
    .then(() => console.log("db connection successful"))
    .catch((err) => console.log(err));
}

module.exports = dbConnect;
