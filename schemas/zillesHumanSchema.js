const mongoose = require('mongoose');

const zillesHumanSchema = mongoose.Schema({
    code:String,
    sex:String,
    age:String,
    bodyWeight:String,
    brainWeight:String,
    part:String,
    staining:String,
    sectionThickness:String,
    planeOfSectioning:String,
    distance:String
})

module.exports = mongoose.model('zillesHuman',zillesHumanSchema)