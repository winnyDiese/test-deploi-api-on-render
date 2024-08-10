
const mongoose = require('mongoose')

const tarifSchema = new mongoose.Schema({
    // destination: String,
    // agence: String,
    // tarif: String

    prix:String,
    dateTarif:String,
    id_agence_dest:String
},{ timestamps: true })

const Tarif = mongoose.models.Tarif || mongoose.model('Tarif',tarifSchema)

module.exports = Tarif
