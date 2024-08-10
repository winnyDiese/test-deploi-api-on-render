
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

const delete_contry = async (req,res) => {
    const { id } = req.params;
    try {
        const deleted_contry = await Pays.findByIdAndDelete(id)

        if (!deleted_contry) return res.status(404).json({ message: 'Pays non, trouvé !' });
        res.status(200).json({ message: 'Un pays a été supprimé avec sucées !', pays: deleted_contry });

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }

}

const update_contry = async (req,res) => {
    
    try {
        const {id} = req.params
        const updates = req.body

        const updated_contry = await Pays.findByIdAndUpdate(id, updates, {new:true})
        if(!updated_contry) return res.status(404).json({message:"Pays non trouvé !"})
        
        res.status(200).json({message:"Pays mise à jour avec succées !", pays: updated_contry})
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}

const one_contry = async (req,res) => {
    const { id } = req.params;
    try {
        const contry = await Pays.findById(id)
    
        if (!contry) return res.status(404).json({ message: 'Pays non, trouvé !' });
        const pays = contry
        res.status(200).json(pays)

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }

}


module.exports = {all_pays, add_pays,one_contry,delete_contry,update_contry}
