
const mongoose = require('mongoose')

const utilisationSchema = new Schema({
    // colis: String,
    // compte: String

    id_compte:String,
    id_colis:String,
    montantRetire:String
    
},{ timestamps: true })

const Utilisation = mongoose.models.Utilisation || mongoose.model('Utilisation',utilisationSchema)

module.exports = Utilisation
