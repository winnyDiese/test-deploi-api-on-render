

const connect_mongodb = require('../lib/connect_db')
const Agence = require('../models/agence')


connect_mongodb()

const all_agence = async (req,res)=>{
    try {
        const agences = await Agence.find()
        res.status(200).json(agences)
    } catch (error) {
        console.log(error)
        res.status(500).send('Une erreur est survenus !')
    }
}

const add_agence = async (req,res) => {
    const {nomAgence, phoneAgence, adresseAgence, emailAgence, logo, active} = await req.body
    const new_agence = new Agence({nomAgence, phoneAgence, adresseAgence, emailAgence, logo, active})
    
    try {
        const saved_agence = await new_agence.save()
        res.status(201).json(saved_agence)
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)

    }
}

module.exports = {all_agence, add_agence}
