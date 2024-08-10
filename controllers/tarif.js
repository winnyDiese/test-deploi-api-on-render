

const connect_mongodb = require('../lib/connect_db')
const Tarif = require('../models/tarif')


connect_mongodb()

const all_tarif = async (req,res)=>{
    try {
        const tarif = await Tarif.find()
        res.status(200).json(tarif)
    } catch (error) {
        console.log(error)
        res.status(500).send('Une erreur est survenus !')
    }
}

const add_tarif = async (req,res)=>{
    const {nomPays, indicatif} = await req.body
    
    const new_tarif = new Tarif({nomPays, indicatif})

    try {
        const saved_tarif = await new_tarif.save()
        res.status(201).json(saved_tarif)
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}

const delete_contry = async (req,res) => {
    const { id } = req.params;
    try {
        const deleted_tarif = await Tarif.findByIdAndDelete(id)

        if (!deleted_tarif) return res.status(404).json({ message: 'tarif non, trouvé !' });
        res.status(200).json({ message: 'Un tarif a été supprimé avec sucées !', tarif: deleted_contry });

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }

}

const update_contry = async (req,res) => {
    
    try {
        const {id} = req.params
        const updates = req.body

        const updated_contry = await Tarif.findByIdAndUpdate(id, updates, {new:true})
        if(!updated_contry) return res.status(404).json({message:"tarif non trouvé !"})
        
        res.status(200).json({message:"tarif mise à jour avec succées !", tarif: updated_contry})
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}

const one_contry = async (req,res) => {
    const { id } = req.params;
    try {
        const tarif = await Tarif.findById(id)
    
        if (!tarif) return res.status(404).json({ message: 'tarif non, trouvé !' });
        res.status(200).json(tarif)

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }

}

module.exports = {all_tarif, add_tarif,one_contry,delete_contry,update_contry}
