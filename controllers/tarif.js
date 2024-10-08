

const Tarif = require('../models/tarif')
const Destination = require('../models/destination'); // Assurez-vous de mettre le bon chemin vers votre modèle Destination
const AgenceDestination = require('../models/agence-destination');


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
    const { prix, dateTarif, id_agence_dest, id_villeA, id_villeB } = req.body;
    
    try {
        // Step 1: Create the destination
        const new_destination = new Destination({ id_villeA, id_villeB });
        const saved_destination = await new_destination.save();

        // Step 2: Insert into AgenceDestination collection
        const new_agence_destination = new AgenceDestination({
            id_agence: id_agence_dest, // ID of the agency
            id_destination: saved_destination._id, // Use the saved destination ID
            statutDest: 'active' // Assuming you want to set a default status
        });
        const saved_agence_destination = await new_agence_destination.save();

        // Step 3: Create the tariff using the saved destination and agency-destination IDs
        const new_tarif = new Tarif({
            prix,
            dateTarif,
            id_agence_dest, // Use the saved agence_destination ID
            id_destination: saved_destination._id // Associate the destination ID with the tariff
        });

        const saved_tarif = await new_tarif.save();

        // Step 4: Respond with the saved tariff, destination, and agence_destination
        res.status(201).json({
            tarif: saved_tarif,
            destination: saved_destination,
            agence_destination: saved_agence_destination
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};


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
