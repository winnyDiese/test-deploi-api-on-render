
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({ 
    // password: String,
    // email: String,
    // username: String

    nomUser:String,
    fonctionAgent:String,
    phoneUser:{
        type: String,
        unique:true
    },
    passwordUser:String,
    emailUser:String,
    adresseUSer:String,
    sexe:String,
    id_typeUser:String,
    id_ville:String,
    statutUser:String
    
},{timestamps:true})

const User = mongoose.models.User || mongoose.model('User', userSchema)
// export default User

module.exports = User
