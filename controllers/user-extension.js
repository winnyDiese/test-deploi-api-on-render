

const connect_mongodb = require('../lib/connect_db')
const UserExtension = require('../models/userExtension')


connect_mongodb()

const all_use_exten = async (req,res)=>{
    try {
        const use_exten = await UserExtension.find()
        res.status(200).json(use_exten)
    } catch (error) {
        console.log(error)
        res.status(500).send('Une erreur est survenus !')
    }
}

const add_use_exten = async (req,res)=>{
    const {id_user, id_extension} = await req.body
    
    const new_use_exten = new UserExtension({id_user, id_extension})

    try {
        const saved_use_exten = await new_use_exten.save()
        res.status(201).json(saved_use_exten)
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}

const delete_use_exten = async (req,res) => {
    const { id } = req.params;
    try {
        const deleted_use_exten = await UserExtension.findByIdAndDelete(id)

        if (!deleted_use_exten) return res.status(404).json({ message: 'use_exten non, trouvé !' });
        res.status(200).json({ message: 'Un use_exten a été supprimé avec sucées !', use_exten: deleted_use_exten });

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }

}

const update_use_exten = async (req,res) => {
    
    try {
        const {id} = req.params
        const updates = req.body

        const updated_use_exten = await UserExtension.findByIdAndUpdate(id, updates, {new:true})
        if(!updated_use_exten) return res.status(404).json({message:"Use_exten non trouvé !"})
        
        res.status(200).json({message:"Use_exten mise à jour avec succées !", use_exten: updated_use_exten})
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}

const one_use_exten = async (req,res) => {
    const { id } = req.params;
    try {
        const use_exten = await UserExtension.findById(id)
    
        if (!use_exten) return res.status(404).json({ message: 'use_exten non, trouvé !' });
        res.status(200).json(use_exten)

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }

}

module.exports = {all_use_exten, add_use_exten,one_use_exten,delete_use_exten,update_use_exten}
