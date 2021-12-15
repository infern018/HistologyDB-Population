const mongoose = require('mongoose');

const zillesAnimalSchema = mongoose.Schema({
    code:String,
    species:String,
    sex:String,
    number:String,
    bodyWeight:String,
    brainWeight:String,
    part:String,
    staining:String,
    sectionThickness:String,
    planeOfSectioning:String,
    distance:String,
    order:String
})

module.exports = mongoose.model('zillesAnimal',zillesAnimalSchema)