

const connect_mongodb = require('../lib/connect_db')
const HistoriqueColis = require('../models/historiqueColis')


connect_mongodb()

const all_story_colis = async (req,res)=>{
    try {
        const story_colis = await HistoriqueColis.find()
        res.status(200).json(story_colis)
    } catch (error) {
        console.log(error)
        res.status(500).send('Une erreur est survenus !')
    }
}

const add_story_colis = async (req,res)=>{
    const {dateNotif, id_user_notif, message} = await req.body
    
    const new_story_colis = new HistoriqueColis({dateNotif, id_user_notif, message})

    try {
        const saved_story_colis = await new_story_colis.save()
        res.status(201).json(saved_story_colis)
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}

const delete_story_colis = async (req,res) => {
    const { id } = req.params;
    try {
        const deleted_story_colis = await HistoriqueColis.findByIdAndDelete(id)

        if (!deleted_story_colis) return res.status(404).json({ message: 'story_colis non, trouvé !' });
        res.status(200).json({ message: 'Un story_colis a été supprimé avec sucées !', story_colis: deleted_story_colis });

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }

}

const update_story_colis = async (req,res) => {
    
    try {
        const {id} = req.params
        const updates = req.body

        const updated_story_colis = await HistoriqueColis.findByIdAndUpdate(id, updates, {new:true})
        if(!updated_story_colis) return res.status(404).json({message:"Story_colis non trouvé !"})
        
        res.status(200).json({message:"Story_colis mise à jour avec succées !", story_colis: updated_story_colis})
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}

const one_story_colis = async (req,res) => {
    const { id } = req.params;
    try {
        const story_colis = await HistoriqueColis.findById(id)
    
        if (!story_colis) return res.status(404).json({ message: 'story_colis non, trouvé !' });
        res.status(200).json(story_colis)

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }

}

// const story_colis_byusers = async (req,res) => {
//     const { id } = req.params;
//     try {
//         const story_colis = await HistoriqueColis.find({id_colis:id})
    
//         if (!story_colis) return res.status(404).json({ message: 'story_colis non, trouvé !' });
//         res.status(200).json(story_colis)

//     } catch (error) {
//         console.log(error)
//         res.status(500).json(error.message)
//     }

// }


module.exports = {all_story_colis, add_story_colis,one_story_colis,delete_story_colis,update_story_colis}
