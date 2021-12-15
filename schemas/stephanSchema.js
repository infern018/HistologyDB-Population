const mongoose = require('mongoose')

const stephanSchema = mongoose.Schema({
    code:String,
    species:String,
    sex:String,
    bodyWeight:String,
    brainWeight:String,
    staining:String,
    sectionThickness:String,
    planeOfSectioning:String,
    distance:String,
    order:String
})

module.exports = mongoose.model('stephan',stephanSchema)