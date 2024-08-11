
const { Schema, default: mongoose } = require("mongoose");

const notificationSchema = new Schema({
    // user: String,
    // message: String

    dateNotif:String,
    id_user_notif:String,
    message:String
})

const Notification = mongoose.models.Notification || mongoose.model('Notification', notificationSchema)

module.exports = Notification