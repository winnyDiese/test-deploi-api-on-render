

const Tarif = require('../models/tarif')
const Destination = require('../models/destination'); // Assurez-vous de mettre le bon chemin vers votre modèle Destination


const all_tarif = async (req,res)=>{
    try {
        const tarif = await Tarif.find()
        .populate({
            path: 'id_destination',
            populate: [
                { path: 'id_villeA' }, // Populez id_villeA à l'intérieur de id_destination
                { path: 'id_villeB' }  // Populez id_villeB à l'intérieur de id_destination
            ]
        })
        .populate('id_agence_dest')
        res.status(200).json(tarif)
    } catch (error) {
        console.log(error)
        res.status(500).send('Une erreur est survenus !')
    }
}


const add_tarif = async (req, res) => {
    const { prix, dateTarif, id_agence_dest, id_villeA, id_villeB } = await req.body;
    
    try {
        // Étape 1: Créer la destination
        const new_destination = new Destination({ id_villeA, id_villeB });
        const saved_destination = await new_destination.save();

        // Étape 2: Utiliser l'ID de la destination sauvegardée pour créer un tarif
        const new_tarif = new Tarif({
            prix,
            dateTarif,
            id_agence_dest, // ID de l'agence
            id_destination: saved_destination._id // Associe l'ID de la destination au tarif
        });

        const saved_tarif = await new_tarif.save();

        // Étape 3: Répondre avec le tarif et la destination sauvegardés
        res.status(201).json({ tarif: saved_tarif, destination: saved_destination });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}



const delete_tarif = async (req,res) => {
    const { id } = req.params;
    try {
        const deleted_tarif = await Tarif.findByIdAndDelete(id)

        if (!deleted_tarif) return res.status(404).json({ message: 'tarif non, trouvé !' });
        res.status(200).json({ message: 'Un tarif a été supprimé avec sucées !', tarif: deleted_tarif });

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }

}

const update_tarif = async (req,res) => {
    
    try {
        const {id} = req.params
        const updates = req.body

        const updated_tarif = await Tarif.findByIdAndUpdate(id, updates, {new:true})
        if(!updated_tarif) return res.status(404).json({message:"Tarif non trouvé !"})
        
        res.status(200).json({message:"Tarif mise à jour avec succées !", tarif: updated_tarif})
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}

const one_tarif = async (req,res) => {
    const { id } = req.params;
    try {
        const tarif = await Tarif.findById(id)
    
        if (!tarif) return res.status(404).json({ message: 'tarif non, trouvé !' });
        res.status(200).json(tarif)

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }

}

module.exports = {all_tarif, add_tarif,one_tarif,delete_tarif,update_tarif}
