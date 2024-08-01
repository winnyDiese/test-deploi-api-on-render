import mongoose, {Schema}  from "mongoose"

const agenceSchema = new Schema({
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
    active: Boolean

},{ timestamps: true })

const Agence = mongoose.models.Agence || mongoose.model('Agence',agenceSchema)
export default Agence
