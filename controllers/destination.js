
const connect_mongodb = require('../lib/connect_db')
const Destination = require('../models/destination')


connect_mongodb()

const all_destination = async (req,res)=>{
    try {
        const destinations = await Destination.find()
        res.status(200).json(destinations)
    } catch (error) {
        console.log(error)
        res.status(500).send('Une erreur est survenus !')
    }
}

const add_destination = async (req,res)=>{
    const {id_villeA,id_villeB} = await req.body
    
    const new_destination = new Destination({id_villeA,id_villeB})

    try {
        const saved_destination = await new_destination.save()
        res.status(201).json(saved_destination)
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}

const delete_destination = async (req,res) => {
    const { id } = req.params;
    try {
        const deleted_destination = await Destination.findByIdAndDelete(id)

        if (!deleted_destination) return res.status(404).json({ message: 'Destination non, trouvé !' });
        res.status(200).json({ message: 'Un destination a été supprimé avec sucées !', destination: deleted_destination });

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }

}

const update_destination = async (req,res) => {
    
    try {
        const {id} = req.params
        const updates = req.body

        const updated_destination = await Destination.findByIdAndUpdate(id, updates, {new:true})
        if(!updated_destination) return res.status(404).json({message:"Destination non trouvé !"})
        
        res.status(200).json({message:"Destination mise à jour avec succées !", destination: updated_destination})
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}

const one_destination = async (req,res) => {
    const { id } = req.params

    try {
        const destination = await Destination.findById(id)
    
        if (!destination) return res.status(404).json({ message: 'destination non, trouvé !' });
        res.status(200).json(destination)

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }

}


module.exports = {all_destination, add_destination,delete_destination,update_destination,one_destination}
