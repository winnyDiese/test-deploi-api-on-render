
const Typeuser = require('../models/typeuser')



const all_type = async (req,res)=>{
    try {
        const types = await Typeuser.find()
        res.status(200).json(types)
    } catch (error) {
        console.log(error)
        res.status(500).send('Une erreur est survenus !')
    }
}

const add_type = async (req,res)=>{
    const {nomType} = await req.body
    
    const new_type = new Typeuser({nomType})

    try {
        const saved_type = await new_type.save()
        res.status(201).json(saved_type)
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}

const delete_type = async (req,res) => {
    const { id } = req.params;
    try {
        const deleted_type = await Typeuser.findByIdAndDelete(id)

        if (!deleted_type) return res.status(404).json({ message: 'Type non, trouvé !' });
        res.status(200).json({ message: 'Un Type a été supprimé avec sucées !', type: deleted_type });

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }

}

const update_type = async (req,res) => {
    
    try {
        const {id} = req.params
        const updates = req.body

        const updated_type = await Typeuser.findByIdAndUpdate(id, updates, {new:true})
        if(!updated_type) return res.status(404).json({message:"Type non trouvé !"})
        
        res.status(200).json({message:"Type mise à jour avec succées !", type: updated_type})
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}

const one_type = async (req,res) => {
    const { id } = req.params

    try {
        const type = await Typeuser.findById(id)
    
        if (!type) return res.status(404).json({ message: 'Type non, trouvé !' });
        res.status(200).json(type)

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }

}


module.exports = {all_type, add_type,delete_type,update_type,one_type}
