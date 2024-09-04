
const mongoose = require('mongoose')

const destinationSchema = new mongoose.Schema({
    // villeA: String,
    // villeB: String

    id_villeA: {
        type: mongoose.Schema.Types.ObjectId, // Définit id_villeA comme ObjectId
        ref: 'Ville' // Référence à la collection Ville
    },
    id_villeB: {
        type: mongoose.Schema.Types.ObjectId, // Définit id_villeB comme ObjectId
        ref: 'Ville' // Référence à la collection Ville
    }
},{ timestamps: true })

const Destination = mongoose.models.Destination || mongoose.model('Destination',destinationSchema)
module.exports = Destination
