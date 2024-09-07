

const HistoriqueColis = require('../models/historiqueColis')


const all_story_colis = async (req,res)=>{
    try {
        const story_colis = await HistoriqueColis.find()
        res.status(200).json(story_colis)
    } catch (error) {
        console.log(error)
        res.status(500).send('Une erreur est survenus !')
    }
}

const add_story_colis = async (req, res) => {
    const { id_colis, id_statut, id_user } = req.body;

    // Create a new HistoriqueColis document with the provided data
    const new_story_colis = new HistoriqueColis({
        id_colis,
        id_statut,
        id_user
    });

    try {
        // Save the new HistoriqueColis document to the database
        const saved_story_colis = await new_story_colis.save();
        res.status(201).json(saved_story_colis);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};


const delete_story_colis = async (req, res) => {
    const { id } = req.params;
    
    try {
        // Find and delete the HistoriqueColis document by its ID
        const deleted_story_colis = await HistoriqueColis.findByIdAndDelete(id);

        if (!deleted_story_colis) {
            return res.status(404).json({ message: 'HistoriqueColis non trouvé !' });
        }

        // Respond with a success message and the deleted document
        res.status(200).json({
            message: 'Un HistoriqueColis a été supprimé avec succès !',
            story_colis: deleted_story_colis
        });

    } catch (error) {
        // Log and respond with the error message
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};


const update_story_colis = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        // Find the document by ID and update it with the provided updates
        const updated_story_colis = await HistoriqueColis.findByIdAndUpdate(id, updates, { new: true });

        if (!updated_story_colis) {
            return res.status(404).json({ message: 'HistoriqueColis non trouvé !' });
        }

        // Respond with a success message and the updated document
        res.status(200).json({
            message: 'HistoriqueColis mis à jour avec succès !',
            story_colis: updated_story_colis
        });

    } catch (error) {
        // Log and respond with the error message
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

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
