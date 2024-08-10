
const mongoose = require('mongoose')

const extensionSchema = new mongoose.Schema({
    // agence: String,
    // extension: String,
    // responsable: String,
    // tel: String,
    // adresse: String,
    // email: String,
    // active: Boolean

    nomExtension:String,
    phoneExtension:String,
    adresseExtension:String,
    emailExtension:String,
    localisation:String,
    id_agence:String,
    id_ville:String,
    statutExtension:String
},{ timestamps: true })

const Extension = mongoose.models.Extension || mongoose.model('Extension',extensionSchema)
module.exports = Extension
