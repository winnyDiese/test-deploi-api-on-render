

const connect_mongodb = require('../lib/connect_db')
const Extension = require('../models/extension')


connect_mongodb()

const all_extension = async (req,res)=>{
    try {
        const extensions = await Extension.find()
        res.status(200).json(extensions)
    } catch (error) {
        console.log(error)
        res.status(500).send('Une erreur est survenus !')
    }
}

const add_extension = async (req,res)=>{
    const {
        nomExtension,
        phoneExtension,
        adresseExtension,
        emailExtension,
        localisation,
        id_agence,
        id_ville,
        statutExtension
    } = await req.body
    
    const new_extension = new Extension({
        nomExtension,
        phoneExtension,
        adresseExtension,
        emailExtension,
        localisation,
        id_agence,
        id_ville,
        statutExtension
    })

    try {
        const saved_extension = await new_extension.save()
        res.status(201).json(saved_extension)
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}

const delete_extension = async (req,res) => {
    const { id } = req.params;
    try {
        const deleted_extension = await Extension.findByIdAndDelete(id)

        if (!deleted_extension) return res.status(404).json({ message: 'Extension non, trouvé !' });
        res.status(200).json({ message: 'Un extension a été supprimé avec sucées !', extension: deleted_extension });

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }

}

const update_extension = async (req,res) => {
    
    try {
        const {id} = req.params
        const updates = req.body

        const updated_extension = await Extension.findByIdAndUpdate(id, updates, {new:true})
        if(!updated_extension) return res.status(404).json({message:"Extension non trouvé !"})
        
        res.status(200).json({message:"Extension mise à jour avec succées !", extension: updated_extension})
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}

const one_extension = async (req,res) => {
    const { id } = req.params

    try {
        const extension = await Extension.findById(id)
    
        if (!extension) return res.status(404).json({ message: 'extension non, trouvé !' });
        res.status(200).json(extension)

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }

}


module.exports = {all_extension, add_extension,delete_extension,update_extension,one_extension}
