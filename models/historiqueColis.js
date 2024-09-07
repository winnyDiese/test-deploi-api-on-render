
const { Schema, default: mongoose } = require("mongoose");

const historiqueColisSchema = new Schema({
    // user: String,
    // message: String
    
    // dateNotif:String,
    // id_user_notif:String,
    // message:String

    id_colis: String,
    id_statut: String,
    id_user: String
    
}, { timestamps: true })

const HistoriqueColis = mongoose.models.HistoriqueColis || mongoose.model('HistoriqueColis', historiqueColisSchema)
module.exports = HistoriqueColis
