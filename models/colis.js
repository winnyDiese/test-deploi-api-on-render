const mongoose = require('mongoose')

const colisSchema = new mongoose.Schema({
    codeColis: String,
    poids: String,
    contenu: String,
    valeur: String,
    source: String,
    
    id_userA: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // Referencing the User model
    id_userB: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    id_extensionA: String,
    id_extensionB: String,
    id_tarif: String,

    id_destination: { type: mongoose.Schema.Types.ObjectId, ref: 'Destination' },  // Referencing the Destination model

    completed: Boolean,
    status: String,
    
    id_agence: { type: mongoose.Schema.Types.ObjectId, ref: 'Agence' }  // Referencing the Agence model

}, { timestamps: true })

const Colis = mongoose.models.Colis || mongoose.model('Colis', colisSchema)

module.exports = Colis
