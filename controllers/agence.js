

const connect_mongodb = require('../lib/connect_db')
const Agence = require('../models/agence')


connect_mongodb()

const all_agence = async (req,res)=>{
    try {
        const agences = await Agence.find()
        res.json(agences)
    } catch (error) {
        console.log(error)
        res.status(500).send('Une erreur est survenus !')
    }
}

const add_agence = async (req,res) => {
    try {
        const agence = new Agence()
    } catch (error) {
        
    }
}

module.exports = {all_agence}
