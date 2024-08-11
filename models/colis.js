
const mongoose = require('mongoose')
const colisSchema = new Schema({
    // contenus: String,
    // poid: String,
    // valeurContenu: String,
    // completed:Boolean,
    // agence: String,
    // expediteur: String,
    // beneficiare: String,
    // extensionDepart: String,
    // extensionArrive: String,
    // tarif: String

    codeColis: String,
    poids:String,
    contenu:String,
    valeur:String,
    source:String,
    id_userA:String,
    id_userB:String,
    id_extensionA:String,
    id_extensionB:String,
    id_tarif:String

},{ timestamps: true })


const Colis = mongoose.models.Colis || mongoose.model('Colis', colisSchema)

module.exports = Colis
