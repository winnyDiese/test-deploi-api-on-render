
const Colis = require('../models/colis')
const User = require('../models/User'); // Import the User model
const Compte = require('../models/Compte'); // Make sure to adjust the path
const HistoriqueColis = require('../models/historiqueColis');



const all_colis = async (req,res)=>{
    try {

        const colis = await Colis.find()
        .populate('id_userA')
        .populate('id_userB')
        .populate('id_agence')
        .populate({
            path: 'id_destination',  // Populate the id_destination field
            populate: [
                { path: 'id_villeA' },  // Nested populate for id_villeA within id_destination
                { path: 'id_villeB' }   // Nested populate for id_villeB within id_destination
            ]
        })
        .sort({createdAt: -1})

        res.status(200).json(colis)
    } catch (error) {
        console.log(error)
        res.status(500).send('Une erreur est survenus !')
    }
}

const add_colis = async (req,res)=>{
    const {
        codeColis,
        poids,
        contenu,
        valeur,
        source,
        id_userA,
        id_userB,
        id_extensionA,
        id_extensionB,
        id_destination,
        completed,
        status,
        id_tarif,

        id_agence
        
    } = await req.body 
    
    const new_colis = new Colis({
        codeColis,
        poids,
        contenu,
        valeur,
        source,
        id_userA,
        id_userB,
        id_extensionA,
        id_extensionB,
        id_destination,
        completed,
        status,
        id_tarif,

        id_agence
    })

    try {
        const saved_colis = await new_colis.save()
        res.status(201).json(saved_colis)
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}

const delete_colis = async (req,res) => {
    const { id } = req.params;
    try {
        const deleted_colis = await Colis.findByIdAndDelete(id)

        if (!deleted_colis) return res.status(404).json({ message: 'Colis non, trouvé !' });
        res.status(200).json({ message: 'Un Colis a été supprimé avec sucées !', colis: deleted_colis });

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }

}

const update_colis = async (req,res) => {
    
    try {
        const {id} = req.params
        const updates = req.body

        const updated_colis = await Colis.findByIdAndUpdate(id, updates, {new:true})
        if(!updated_colis) return res.status(404).json({message:"Colis non trouvé !"})
        
        res.status(200).json({message:"Colis mise à jour avec succées !", colis: updated_colis})
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}

const one_colis = async (req,res) => {
    const { id } = req.params

    try {
        const colis = await Colis.findById(id)
    
        if (!colis) return res.status(404).json({ message: 'Colis non, trouvé !' });
        res.status(200).json(colis)

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }

}

const colis_bycode = async (req,res) => {
    const { codeColis } = req.params

    try {
        const colis = await Colis.findOne({codeColis})
        .populate('id_userA')
        .populate('id_userB')
        .populate('id_agence')
        .populate({
            path: 'id_destination',  // Populate the id_destination field
            populate: [
                { path: 'id_villeA' },  // Nested populate for id_villeA within id_destination
                { path: 'id_villeB' }   // Nested populate for id_villeB within id_destination
            ]
        })
    
        if (!colis) return res.status(404).json({ message: 'Colis non, trouvé !' });
       
        // Find all history entries related to the Colis using id_colis
        const historiqueColis = await HistoriqueColis.find({ id_colis: colis._id });

        // Return both the Colis details and the corresponding history
        res.status(200).json({
            colis,
            historique: historiqueColis
        });

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }

}

const colis_byuser_a = async (req,res) => {
    const { id } = req.params

    try {
        const colis = await Colis.find({id_userA:id})
    
        if (!colis) return res.status(404).json({ message: 'Colis non, trouvé !' });
        res.status(200).json(colis)

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }

}

const colis_byuser_b = async (req,res) => {
    const { id } = req.params

    try {
        const colis = await Colis.find({id_userB:id})
    
        if (!colis) return res.status(404).json({ message: 'Colis non, trouvé !' });
        res.status(200).json(colis)

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }

}

const update_colis_my_data = async (req, res) => {
    try {
        const { id } = req.params; // Get the colis ID from the request parameters

        // Check if the Colis exists
        const colis = await Colis.findById(id);
        if (!colis) {
            return res.status(404).json({ message: "Colis non trouvé !" });
        }

        const { nomUser, phoneUser, adresseUser } = req.body; // Extract user data from the request body

        // Create a new user with the provided information
        const newUser = new User({
            nomUser,
            phoneUser,
            adresseUser
        });

        // Save the new user to the database
        const savedUser = await newUser.save();

        // Prepare the update object with the new user's ID
        const updates = {
            id_userA: savedUser._id
        };

        // Update the existing Colis with the new user ID
        const updated_colis = await Colis.findByIdAndUpdate(id, updates, { new: true });

        res.status(200).json({ message: "Colis mis à jour avec succès !", colis: updated_colis });
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    }
};

const finish_update_colis = async (req, res) => {
    try {
        const { id } = req.params; // Get the Colis ID from the request parameters

        // Check if the Colis exists
        const colis = await Colis.findById(id);
        if (!colis) {
            return res.status(404).json({ message: "Colis non trouvé !" });
        }

        const { nomUser, phoneUser, adresseUser } = req.body; // Extract user data from the request body

        // Create a new user with the provided information
        const newUser = new User({
            nomUser,
            phoneUser,
            adresseUser
        });

        // Save the new user to the database
        const savedUser = await newUser.save();

         // Generate a random codeColis with 10 alphanumeric characters
         const generateCodeColis = () => {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let code = '';
            for (let i = 0; i < 15; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                code += characters[randomIndex];
            }
            return code;
        };

        const codeColis = generateCodeColis();

        // Prepare the update object with the new user's ID
        const updates = {
            id_userB: savedUser._id,
            codeColis,
            completed: true
        };

        // Update the existing Colis with the new user ID
        const updated_colis = await Colis.findByIdAndUpdate(id, updates, { new: true });

        // Find the Compte associated with the Colis's id_agence
        const compte = await Compte.findOne({ id_agence: colis.id_agence });
        if (!compte) {
            return res.status(404).json({ message: "Compte non trouvé pour l'agence spécifiée !" });
        }

        // Decrement the montantCompte by 1
        const newMontantCompte = parseFloat(compte.montantCompte) - 1;

        // Update the Compte with the new montantCompte
        compte.montantCompte = newMontantCompte.toString(); // Convert back to string if necessary
        await compte.save();

        // Create a new history entry
        const newHistorique = new HistoriqueColis({
            id_colis: updated_colis._id,
            id_statut: updated_colis.status
        });

        // Save the history entry
        await newHistorique.save();

        res.status(200).json({ 
            message: `Le colis a été bien créée voici voici le code du colis "${updated_colis.codeColis}"`
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    }
};

const send_my_identity = async (req, res) => {
    try {
        const { id } = req.params; // Récupérer l'ID du colis à partir des paramètres de la requête

        // Vérifier si le Colis existe
        const colis = await Colis.findById(id);
        if (!colis) {
            return res.status(404).json({ message: "Colis non trouvé !" });
        }

        // Extraire les données de l'utilisateur depuis le corps de la requête
        const { nomUser, phoneUser, adresseUser } = req.body;

        // Créer un nouvel utilisateur avec les informations fournies
        const newUser = new User({
            nomUser,
            phoneUser,
            adresseUser
        });

        // Sauvegarder le nouvel utilisateur dans la base de données
        const savedUser = await newUser.save();

        // Préparer l'objet de mise à jour avec l'ID de l'utilisateur nouvellement créé
        const updates = {
            id_userA: savedUser._id, // Mettre à jour le champ id_userB avec l'ID de l'utilisateur
        };

        // Mettre à jour le colis existant avec l'ID de l'utilisateur et retourner le colis mis à jour
        const updated_colis = await Colis.findByIdAndUpdate(id, updates, { new: true });

        // Envoyer une réponse de succès avec le colis mis à jour
        res.status(200).json({
            message: "Les informations utilisateur ont été enregistrées avec succès et le colis mis à jour.",
            colis: updated_colis, // Retourner les détails du colis mis à jour
        });

        console.log("Send colis step two : send my identity ! ")

    } catch (error) {
        console.error(error); // Log l'erreur sur le serveur pour le debugging
        res.status(500).json({ message: "Une erreur est survenue lors du traitement de la demande.", error: error.message });
    }
}

const colis_change_status = async (req, res) => {
    try {
        const { id } = req.params; // Récupère l'ID du colis à partir des paramètres de l'URL
        const { status } = req.body; // Récupère le nouveau statut à partir du corps de la requête

        // Recherche et met à jour le statut du colis
        const updated_colis = await Colis.findByIdAndUpdate(
            id, 
            { status }, // Met à jour uniquement le champ "status"
            { new: true } // Retourne le document mis à jour
        );

        // Vérifie si le colis existe
        if (!updated_colis) {
            return res.status(404).json({ message: 'Colis non trouvé !' });
        }


        // Crée une nouvelle entrée d'historique pour ce changement de statut
        const newHistorique = new HistoriqueColis({
            id_colis: updated_colis._id,
            id_statut: updated_colis.status, // Utilise le nouveau statut
            // date: new Date() // Enregistre la date du changement de statut
        });

        // Sauvegarde l'entrée d'historique
        await newHistorique.save();

        // Envoie la réponse avec le colis mis à jour
        res.status(200).json({
            message: 'Statut du colis mis à jour avec succès !',
            colis: updated_colis
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    }
}

module.exports = {
    all_colis, 
    add_colis,
    delete_colis,
    update_colis,
    one_colis,
    colis_bycode,
    colis_byuser_a,
    colis_byuser_b, 
    update_colis_my_data,
    finish_update_colis,
    send_my_identity,
    colis_change_status
}

