
const mongoose = require('mongoose')

const destinationSchema = new mongoose.Schema({
    // villeA: String,
    // villeB: String

    id_villeA:String,
    id_villeB:String
},{ timestamps: true })

const Destination = mongoose.models.Destination || mongoose.model('Destination',destinationSchema)
module.exports = Destination
