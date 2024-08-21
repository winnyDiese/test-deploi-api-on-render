
const connect_mongodb = require('../lib/connect_db')
const AgenceDestination = require('../models/agence-destination')


connect_mongodb()

const all_agence_desti = async (req,res)=>{
    try {
        const agence_desti = await AgenceDestination.find()
        res.status(200).json(agence_desti)
    } catch (error) {
        console.log(error)
        res.status(500).send('Une erreur est survenus !')
    }
}

const add_agence_desti = async (req,res)=>{
    const {id_agence,id_destination,statutDest} = await req.body
    
    const new_agence_desti = new AgenceDestination({id_agence,id_destination,statutDest})

    try {
        const saved_agence_desti = await new_agence_desti.save()
        res.status(201).json(saved_agence_desti)
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}

const delete_agence_desti = async (req,res) => {
    const { id } = req.params;
    try {
        const deleted_agence_desti = await AgenceDestination.findByIdAndDelete(id)

        if (!deleted_agence_desti) return res.status(404).json({ message: 'Agence_desti non, trouvé !' });
        res.status(200).json({ message: 'Un agence_desti a été supprimé avec sucées !', agence_desti: deleted_agence_desti });

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }

}

const update_agence_desti = async (req,res) => {
    
    try {
        const {id} = req.params
        const updates = req.body

        const updated_agence_desti = await AgenceDestination.findByIdAndUpdate(id, updates, {new:true})
        if(!updated_agence_desti) return res.status(404).json({message:"agence_desti non trouvé !"})
        
        res.status(200).json({message:"agence_desti mise à jour avec succées !", agence_desti: updated_agence_desti})
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}

const one_agence_desti = async (req,res) => {
    const { id } = req.params

    try {
        const agence_desti = await AgenceDestination.findById(id)
    
        if (!agence_desti) return res.status(404).json({ message: 'agence_desti non, trouvé !' });
        res.status(200).json(agence_desti)

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }

}

const one_agence_desti_by_status = async (req,res) => {
    const { status } = req.params

    try {
        const agence_desti = await AgenceDestination.find({statutDest:status})
    
        if (!agence_desti) return res.status(404).json({ message: 'agence_desti non, trouvé !' });
        res.status(200).json(agence_desti)

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }

}

const one_agence_desti_by_desti = async (req,res) => {
    const { destination } = req.params

    try {
        const agence_desti = await AgenceDestination.find({id_destination:destination})
    
        if (!agence_desti) return res.status(404).json({ message: 'agence_desti non, trouvé !' });
        res.status(200).json(agence_desti)

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }

}


module.exports = {all_agence_desti, add_agence_desti,delete_agence_desti,update_agence_desti,one_agence_desti,one_agence_desti_by_status,one_agence_desti_by_desti}
