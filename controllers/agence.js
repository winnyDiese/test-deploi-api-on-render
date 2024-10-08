

const Agence = require('../models/agence')
const AgenceDestination = require('../models/agence-destination')
const Colis = require('../models/colis')

// const Agence = require('./models/Agence'); // Assurez-vous que le chemin est correct
// const Compte = require('./models/Compte'); // Assurez-vous que le chemin est correct



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
    const {nomAgence, phoneAgence, adresseAgence, emailAgence, logo, active, solde} = await req.body
    const new_agence = new Agence({nomAgence, phoneAgence, adresseAgence, emailAgence, logo, active, solde})
    
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

const get_agences_with_comptes = async (req, res) => {
    try {
        const agences_with_comptes = await Agence.aggregate([
            {
                $lookup: {
                    from: 'comptes', // Nom de la collection Compte
                    localField: '_id', // Champ de référence dans la collection Agence
                    foreignField: 'id_agence', // Champ de référence dans la collection Compte
                    as: 'comptes' // Nom du tableau résultant qui contient les comptes associés
                }
            },
            {
                $unwind: '$comptes' // Décompose le tableau de comptes en plusieurs documents
            },
            {
                $project: {
                    nomAgence: 1,
                    phoneAgence: 1,
                    adresseAgence: 1,
                    emailAgence: 1,
                    logo: 1,
                    active: 1,
                    montantCompte: '$comptes.montantCompte', // Inclut le montantCompte de chaque compte associé
                    solde: '$comptes.solde' // Inclut le solde de chaque compte associé
                }
            }
        ]);

        if (!agences_with_comptes.length) {
            return res.status(404).json({ message: 'No agencies found' });
        }

        res.status(200).json(agences_with_comptes);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

const get_agence_by_destination = async (req, res) => {
    const { id_colis } = req.params; // Get the id_colis from the request parameters

    try {
        // Step 1: Find the Colis by its ID and retrieve the id_destination
        const colis = await Colis.findById(id_colis);

        if (!colis) {
            return res.status(404).json({ message: "Colis non trouvé !" });
        }

        const id_destination = colis.id_destination;

        // Step 2: Find all AgenceDestination entries with the retrieved id_destination
        const agence_destinations = await AgenceDestination.find({ id_destination })
            .populate('id_agence') // Populate the id_agence field with the related Agence documents
            .populate('id_destination') // Populate the id_destination field with the related Destination documents
            .exec();

        // Step 3: Return the found entries
        res.status(200).json(agence_destinations);
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    }
};

module.exports = {all_agence, add_agence, delete_agence, update_agence, one_agence,get_active_agences,get_inactive_agences, get_agences_with_comptes, get_agence_by_destination}
