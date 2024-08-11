import mongoose, {Schema}  from "mongoose"

const userExtensionSchema = new Schema({
    // user: String,
    // extension: String
    
    id_user:String,
    id_extension:String
    
},{ timestamps: true })

const UserExtension = mongoose.models.UserExtension || mongoose.model('UserExtension',userExtensionSchema)
export default UserExtension
