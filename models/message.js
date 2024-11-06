
const { Schema, default: mongoose } = require("mongoose");

const messageSchema = new Schema({
    // user: String,
    // message: String

    dateNotif:String,
    id_user_notif:String,
    names: String,
    tel: String,
    email: String,
    message:String
})

const Message = mongoose.models.Message || mongoose.model('Message', messageSchema)

module.exports = Message
