const Mongoose = require('mongoose');
const { MONGODB_URL } = process.env;
//Database Connection
exports.connect = () => {
    Mongoose.connect(MONGODB_URL)
    .then(() => {
        console.log("DATABASE CONNECTED SUCCESSFULLY")
    })
    .catch((err) => {
        console.log(`ERROR IN CONNECTING DATABASE ${err}`)
        process.exit(1)
    })
}