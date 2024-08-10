
const mongoose = require('mongoose')
const compteSchema = new mongoose.Schema({

    dateCompte:String,
    typeCompte:String,
    montantCompte:String,
    solde:String,
    id_agence:String,
    id_user:String

},{ timestamps: true })

const Compte = mongoose.models.Compte || mongoose.model('Compte',compteSchema)
module.exports = Compte
