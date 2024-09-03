
const mongoose = require('mongoose')
const compteSchema = new mongoose.Schema({

    dateCompte:String,
    typeCompte:String,
    montantCompte:String,
    solde:String,
    id_agence: {
        type: mongoose.Schema.Types.ObjectId, // Définit id_agence comme un ObjectId
        ref: 'Agence' // Référence à la collection Agence
    },
    id_user:String

},{ timestamps: true })

const Compte = mongoose.models.Compte || mongoose.model('Compte',compteSchema)
module.exports = Compte
