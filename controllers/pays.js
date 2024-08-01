
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
    const {nomPays, indicatif} = await req.body
    
    const new_pays = new Pays({nomPays, indicatif})

    try {
        const saved_pays = await new_pays.save()
        res.status(201).json(saved_pays)
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}

module.exports = {all_pays, add_pays}