

const connect_mongodb = require('../lib/connect_db')
const Utilisation = require('../models/utilisation')


connect_mongodb()

const all_using = async (req,res)=>{
    try {
        const usings = await Utilisation.find()
        res.status(200).json(usings)
    } catch (error) {
        console.log(error)
        res.status(500).send('Une erreur est survenus !')
    }
}

const add_using = async (req,res) => {
    const {nomAgence, phoneAgence, adresseAgence, emailAgence, logo, active} = await req.body
    const new_agence = new Agence({nomAgence, phoneAgence, adresseAgence, emailAgence, logo, active})
    
    try {
        const saved_using = await Utilisation.save()
        res.status(201).json(saved_using)
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}

const delete_using = async (req,res) => {
    const { id } = req.params;
    try {
        const deleted_using = await Utilisation.findByIdAndDelete(id)

        if (!deleted_using) return res.status(404).json({ message: 'using non, trouvé !' });
        res.status(200).json({ message: 'Un using a été supprimé avec sucées !', utilisation: deleted_using });

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }

}

const update_using = async (req,res) => {
    
    try {
        const {id} = req.params
        const updates = req.body

        const updated_using = await Utilisation.findByIdAndUpdate(id, updates, {new:true})
        if(!updated_using) return res.status(404).json({message:"using non trouvé !"})
        
        res.status(200).json({message:"using mise à jour avec succées !", utilisation: updated_using})
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}

const one_using = async (req,res) => {
    const { id } = req.params;
    try {
        const using = await Utilisation.findById(id)
    
        if (!using) return res.status(404).json({ message: 'using non, trouvé !' });
        res.status(200).json(using)

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }

}



module.exports = {all_using, add_using, delete_using, update_using, one_using}
