const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/auth_express')

const db = mongoose.connection

db.once('open', (err) => {
    if(err) {console.log(err); return}
    console.log("Connected to DB!")
})

module.exports = db