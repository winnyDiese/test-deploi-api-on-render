
const connect_mongodb = require('../lib/connect_db')
const Ville = require('../models/ville')


connect_mongodb()

const all_ville = async (req,res)=>{
    try {
        const ville = await Ville.find()
        res.status(200).json(ville)
    } catch (error) {
        console.log(error)
        res.status(500).send('Une erreur est survenus !')
    }
}


const add_ville = async (req,res)=>{
    const {nomVille, id_pays} = await req.body
    const new_ville = new Ville({nomVille, id_pays})

    try {
        const saved_ville = await new_ville.save()
        res.status(201).json(saved_ville)
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}


const city_by_contry = async (req,res)=>{
    const id_pays = req.params.id

    try {
        const cities = await Ville.find({id_pays})
        if(!cities) return res.status(404).send('Ville non trouvée !')
            
        res.status(201).json(cities)
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}

module.exports = {all_ville, add_ville, city_by_contry}