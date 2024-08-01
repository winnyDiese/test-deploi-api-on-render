
const connect_mongodb = require('../lib/connect_db')
const Pays = require('../models/pays')

connect_mongodb()

const all_pays = async (req,res)=>{
    try {
        const pays = await Pays.find()
        res.status(200).json(pays)
    } catch (error) {
        console.log(error)
        res.status(500).send('Une erreur est survenus !')
    }
}


const add_pays = async (req,res)=>{
    
}
