
const mongoose = require('mongoose')

const tarifSchema = new mongoose.Schema({
    // destination: String,
    // agence: String,
    // tarif: String

    prix:String,
    dateTarif:String,
    id_agence_dest:{
        type: mongoose.Schema.Types.ObjectId, // Définit id_destination comme un ObjectId
        ref: 'Destination' // Référence à la collection Destination
    }
},{ timestamps: true })

const Tarif = mongoose.models.Tarif || mongoose.model('Tarif',tarifSchema)

module.exports = Tarif
