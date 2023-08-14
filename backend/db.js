const mongoose = require("mongoose");
var mongoURL = process.env.DB_URL || "mongodb+srv://danishfayyaz:hwllo123@cluster0.q2jez5z.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });

var connection = mongoose.connection

connection.on('connected', () => {
    console.log("MongoDb Connection Success")
})
connection.on('error', () => {
    console.log('MongoDb Connection Failed')
})
module.exports = mongoose