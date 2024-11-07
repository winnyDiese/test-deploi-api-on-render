const jwt = require('jsonwebtoken')
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
    adresseUser:String,
    sexe:String,
    id_typeUser:String,
    id_ville:String,
    statutUser:String,
    role:String,
    id_agence:String,
    authTokens: [{
        authToken: {
            type: String,
            required: true
        }
    }]
    
},{timestamps:true})


// Ajout de la méthode generateAuthToken au schéma User
userSchema.methods.generateAuthToken = async function () {
    // Génération du token JWT avec l'_id de l'utilisateur
    const authToken = jwt.sign({ _id: this._id.toString() }, 'foo'); // Remplace 'foo' par une vraie clé secrète dans un environnement de production

    // Ajout du token généré dans le tableau authTokens
    this.authTokens.push({ authToken });

    // Sauvegarde de l'utilisateur avec le nouveau token dans la base de données
    await this.save();

    return authToken; // Retourne le token pour être utilisé par d'autres fonctions (ex: login)
};


const User = mongoose.models.User || mongoose.model('User', userSchema)
// export default User

module.exports = User
