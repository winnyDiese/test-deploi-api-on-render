const mongoose = require('mongoose')

const agenceSchema = new mongoose.Schema({
    // agence: String,
    // email: String,
    // tel: String,
    // adresse: String,
    // ville: String,
    // slogan: String,
    // stock: Number,
    // active: Boolean
    
    nomAgence: String,
    phoneAgence: String,
    adresseAgence: String,
    emailAgence:String,
    logo:String,
    active: Boolean,
    solde: Number,

    demande_partenariat: { type: Boolean, default: false } // Valeur par défaut false

},{ timestamps: true })

const Agence = mongoose.models.Agence || mongoose.model('Agence',agenceSchema)
// export default Agence
module.exports = Agence
