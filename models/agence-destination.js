
const mongoose = require('mongoose')

const agenceDestinationSchema = new mongoose.Schema({
    // villeA: String,
    // villeB: String

    id_agence:String,
    id_destination:String,
    statutDest:String
    
},{ timestamps: true })

const AgenceDestination = mongoose.models.AgenceDestination || mongoose.model('AgenceDestination',agenceDestinationSchema)
module.exports = AgenceDestination