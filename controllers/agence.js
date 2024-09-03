

const Agence = require('../models/agence')



const all_agence = async (req,res)=>{
    try {
        const agences = await Agence.find()
        res.status(200).json(agences)
    } catch (error) {
        console.log(error)
        res.status(500).send('Une erreur est survenus !')
    }
}

const add_agence = async (req,res) => {
    const {nomAgence, phoneAgence, adresseAgence, emailAgence, logo, active} = await req.body
    const new_agence = new Agence({nomAgence, phoneAgence, adresseAgence, emailAgence, logo, active})
    
    try {
        const saved_agence = await new_agence.save()
        res.status(201).json(saved_agence)
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}

const delete_agence = async (req,res) => {
    const { id } = req.params;
    try {
        const deleted_agence = await Agence.findByIdAndDelete(id)

        if (!deleted_agence) return res.status(404).json({ message: 'Agence non, trouvé !' });
        res.status(200).json({ message: 'Un Agence a été supprimé avec sucées !', agence: deleted_agence });

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }

}

const update_agence = async (req,res) => {
    
    try {
        const {id} = req.params
        const updates = req.body

        const updated_agence = await Agence.findByIdAndUpdate(id, updates, {new:true})
        if(!updated_agence) return res.status(404).json({message:"Agence non trouvé !"})
        
        res.status(200).json({message:"Agence mise à jour avec succées !", agence: updated_agence})
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}

const one_agence = async (req,res) => {
    const { id } = req.params;
    try {
        const agence = await Agence.findById(id)
    
        if (!agence) return res.status(404).json({ message: 'Agence non, trouvé !' });
        res.status(200).json(agence)

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }

}

const get_active_agences = async (req, res) => {
    try {
        const active_agences = await Agence.find({ active: true }); // Recherche des agences actives
        res.status(200).json(active_agences); // Renvoie les agences actives en réponse
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message); // Gère les erreurs et renvoie un message d'erreur
    }
};

const get_inactive_agences = async (req, res) => {
    try {
        const inactive_agences = await Agence.find({ active: false }); // Recherche des agences inactives
        res.status(200).json(inactive_agences); // Renvoie les agences inactives en réponse
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message); // Gère les erreurs et renvoie un message d'erreur
    }
};




module.exports = {all_agence, add_agence, delete_agence, update_agence, one_agence,get_active_agences,get_inactive_agences}
