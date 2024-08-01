

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

module.exports = {all_user, add_user}