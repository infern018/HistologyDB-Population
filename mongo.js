const mongoose = require('mongoose')
const mongoURL = "mongodb://localhost:27017"; //add your URL here to connect to your DB

module.exports = async () => {
    await mongoose.connect(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology : true
    })

    return mongoose
}