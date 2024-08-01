

const connect_mongodb = require('../lib/connect_db')
const User = require('../models/user')


connect_mongodb()

const all_user = async (req,res)=>{
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        console.log(error)
        res.status(500).send('Une erreur est survenus !')
    }
}


const add_user = async (req,res)=>{
    const {nomUser, fonctionAgent, phoneUser, passwordUser, emailUser, adresseUSer, sexe, id_typeUser, id_ville, statutUser } = await req.body
    const new_user = new User({nomUser, fonctionAgent, phoneUser, passwordUser, emailUser, adresseUSer, sexe, id_typeUser, id_ville, statutUser })

    try {
        const saved_user = await new_user.save()
        res.status(201).json(saved_user)
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}

const user_login = async (req,res)=>{
    const {phoneUser, passwordUser} = await req.body
    
    try {
        const user = await User.findOne({phoneUser,passwordUser})
        if(!user) res.status(401).send('Mot de passe ou numéro de télephone non valide...')
        
        res.status(201).json(user)
    } catch (error) {
        console.log(error)
        res.status(500).send('Erreur de mot de passe...')
    }
}

module.exports = {all_user, add_user, user_login}