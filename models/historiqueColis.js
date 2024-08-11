
const { Schema, default: mongoose } = require("mongoose");

const historiqueColisSchema = new Schema({
    // user: String,
    // message: String
    
    dateNotif:String,
    id_user_notif:String,
    message:String
})

const HistoriqueColis = mongoose.models.HistoriqueColis || mongoose.model('HistoriqueColis', historiqueColisSchema)
module.exports = HistoriqueColis
