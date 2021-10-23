var mongoose = require("mongoose");
const connectDb = () => {
    return mongoose.connect(process.env.MONGO_URL)
};

exports.connectDb = connectDb;