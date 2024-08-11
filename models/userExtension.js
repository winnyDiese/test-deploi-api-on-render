
const mongoose = require('mongoose')

const userExtensionSchema = new mongoose.Schema({
    // user: String,
    // extension: String
    
    id_user:String,
    id_extension:String
    
},{ timestamps: true })

const UserExtension = mongoose.models.UserExtension || mongoose.model('UserExtension',userExtensionSchema)
module.exports = UserExtension
