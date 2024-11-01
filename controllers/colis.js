
const Colis = require('../models/colis')
const User = require('../models/User'); // Import the User model
const Compte = require('../models/Compte'); // Make sure to adjust the path
const HistoriqueColis = require('../models/historiqueColis');
const Agence = require('../models/agence');
const Utilisation = require('../models/utilisation');
const Destination = require('../models/destination');
const { default: mongoose } = require('mongoose');


const all_colis = async (req,res)=>{
    try {

        const colis = await Colis.find({completed:true})
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

const new_colis = async (req, res) => {
    const { ville_A, ville_B, completed, status } = await req.body;

    try {
        // Conversion de ville_A et ville_B en ObjectId pour comparaison correcte
        const villeAObjectId = new mongoose.Types.ObjectId(ville_A);
        const villeBObjectId = new mongoose.Types.ObjectId(ville_B);

        // Recherche d'une destination correspondant à ville_A et ville_B
        const destination = await Destination.findOne({
            id_villeA: villeAObjectId,
            id_villeB: villeBObjectId
        });

        if (!destination) {
            return res.status(404).json({ message: 'Cette destination n\'existe pas.' });
        }

        // Création d'un nouveau colis avec les informations fournies et l'id de destination
        const newColis = new Colis({
            id_destination: destination._id,
            status,
            completed
        });

        const savedColis = await newColis.save();
        res.status(201).json(savedColis);

    } catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    }
};


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

        // res.status(200).json(colis)

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
        const { id } = req.params; // Récupère l'ID du colis depuis les paramètres de la requête
        const { nomUser, phoneUser, adresseUser, id_user } = req.body; // Extract user data and ID of the user performing the action from the request body

        // Vérifier si le colis existe
        const colis = await Colis.findById(id);
        if (!colis) {
            return res.status(404).json({ message: "Colis non trouvé !" });
        }

        // Créer un nouvel utilisateur avec les informations fournies
        const newUser = new User({
            nomUser,
            phoneUser,
            adresseUser,
            role:"beneficiaire"
        });

        // Sauvegarder le nouvel utilisateur dans la base de données
        const savedUser = await newUser.save();

        // Générer un codeColis aléatoire de 15 caractères alphanumériques
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

        // Préparer l'objet de mise à jour avec l'ID du nouvel utilisateur
        const updates = {
            id_userB: savedUser._id,
            codeColis,
            completed: true
        };

        // Mettre à jour le colis avec les nouvelles informations
        const updated_colis = await Colis.findByIdAndUpdate(id, updates, { new: true });

        // Trouver l'agence associée au colis
        const agence = await Agence.findById(colis.id_agence);
        if (!agence) {
            return res.status(404).json({ message: "Agence non trouvée pour le colis spécifié !" });
        }

        // Vérifier si le solde de l'agence est supérieur à 0
        const currentSolde = parseFloat(agence.solde) || 0; // Valeur par défaut 0 si non définie
        if (currentSolde <= 0) {
            return res.status(400).json({ message: "Pas assez de crédit pour traiter cette demande." });
        }

        // Trouver le dernier compte pour l'agence
        const lastCompte = await Compte.findOne({ id_agence: colis.id_agence }).sort({ createdAt: -1 });

        if (lastCompte && lastCompte.typeCompte === 'Using') {

            // Mettre à jour le solde de l'agence
            const newSoldeAgence = currentSolde - 1;
            
            agence.solde = newSoldeAgence.toString(); // Conversion en string si nécessaire
            await agence.save();

            // Mettre à jour le montant compte
            lastCompte.montantCompte = parseFloat(lastCompte.montantCompte) + 1;
            // Mettre à jour le solde du dernier compte
            const newSoldeCompte = parseFloat(lastCompte.solde) - 1;
            lastCompte.solde = newSoldeCompte.toString(); // Conversion en string si nécessaire
            await lastCompte.save();

            // Créer une nouvelle entrée d'utilisation
            const newUtilisation = new Utilisation({
                id_compte: lastCompte._id,
                id_colis: updated_colis._id,
                montantRetire: '1' // Supposant que montantRetire est 1
            });
            await newUtilisation.save();

        } else {
            // Créer un nouveau compte de type 'Using'
            const newCompte = new Compte({
                id_agence: colis.id_agence,
                typeCompte: 'Using',
                solde: currentSolde - 1, // Solde initial pour le nouveau compte
                montantCompte: '1', // Supposant que montantCompte initial est 1
                dateCompte: new Date(),
            });

            // Sauvegarder le nouveau compte dans la base de données
            await newCompte.save();

            // Mettre à jour le solde de l'agence
            agence.solde = (currentSolde - 1).toString(); // Conversion en string si nécessaire
            await agence.save();

            // Créer une nouvelle entrée d'utilisation
            const newUtilisation = new Utilisation({
                id_compte: newCompte._id,
                id_colis: updated_colis._id,
                montantRetire: '1' // Supposant que montantRetire est 1
            });
            await newUtilisation.save();
        }

        // Utiliser le statut du colis (colis.status) pour le champ id_statut
        const id_statut = colis.status; // Assigner le statut actuel du colis

        // Créer et sauvegarder l'historique du colis
        const newHistorique = new HistoriqueColis({
            id_colis: updated_colis._id,
            id_statut, // Utilise le statut du colis
            id_user    // L'ID de l'utilisateur (qui a fait l'action) fourni dans req.body
        });

        await newHistorique.save();

        // Envoyer la réponse avec le code du colis mis à jour
        res.status(200).json({ 
            message: `Le colis a été bien enregistré. Voici le code du colis : "${updated_colis.codeColis}"`
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
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
            adresseUser,
            role:"client"
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
        const { id } = req.params; // Récupérer l'ID du colis
        const { status } = req.body; // Récupérer le nouveau statut à partir du corps de la requête

        // Statuts autorisés dans l'ordre
        const validStatusFlow = {
            demande: "depot",
            depot: "charge",
            charge: "en cours",
            "en cours": "arrive",
            arrive: "retire",
        };

        // Trouver le colis par ID
        const existing_colis = await Colis.findById(id);

        if (!existing_colis) return res.status(404).json({ message: "Colis non trouvé !" });

        // Récupérer le statut actuel du colis
        const currentStatus = existing_colis.status;

        // Vérifier si le statut à mettre à jour est bien le statut suivant autorisé
        const expectedNextStatus = validStatusFlow[currentStatus];

        // if (currentStatus === status) {
        //     return res.status(400).json({ message: "Le statut est déjà à jour." });
        // }

        // Vérifier que le nouveau statut correspond à celui attendu
        if (status !== expectedNextStatus) {
            return res.status(400).json({
                message: `Statut incorrect. Le prochain statut attendu après '${currentStatus}' est '${expectedNextStatus}'.`,
            });
        }

        // Si le statut est correct, faire la mise à jour
        existing_colis.status = status;
        const updated_colis = await existing_colis.save();

          // Crée une nouvelle entrée d'historique pour ce changement de statut
        const newHistorique = new HistoriqueColis({
            id_colis: updated_colis._id,
            id_statut: updated_colis.status, // Utilise le nouveau statut
            // date: new Date() // Enregistre la date du changement de statut
        });

        // Sauvegarde l'entrée d'historique
        await newHistorique.save();


        res.status(200).json({ message: "Statut du colis mis à jour avec succès", colis: updated_colis });
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    }
};

const countColisByStatus = async (req, res) => {
    try {
      // Compter le nombre de colis pour chaque statut
      const statusCounts = await Promise.all([
        Colis.countDocuments({ status: "demande" }),
        Colis.countDocuments({ status: "depot" }),
        Colis.countDocuments({ status: "charge" }),
        Colis.countDocuments({ status: "en cours" }),
        Colis.countDocuments({ status: "arrive" }),
        Colis.countDocuments({ status: "retire" }),
        Colis.countDocuments({}),

      ]);
  
      // Préparer un objet contenant les comptes de chaque statut
      const result = {
        demande: statusCounts[0],
        depot: statusCounts[1],
        charge: statusCounts[2],
        enCours: statusCounts[3],
        arrive: statusCounts[4],
        retire: statusCounts[5],
        all_colis: statusCounts[6],
      };
  
      res.status(200).json(result); // Retourne l'objet avec les comptes
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur lors de la récupération des données." });
    }
};

const countColisByStatusForUser = async (req, res) => {
    const { id } = req.params; // Récupérer l'ID depuis les paramètres de la requête
  
    try {
      // Vérifier si l'ID est fourni
      if (!id) {
        return res.status(400).json({ message: "L'ID utilisateur est requis." });
      }
  
      // Compter le nombre de colis pour chaque statut spécifique à l'utilisateur
      const statusCounts = await Promise.all([
        Colis.countDocuments({ status: "demande", id_userA: id }),
        Colis.countDocuments({ status: "depot", id_userA: id }),
        Colis.countDocuments({ status: "charge", id_userA: id }),
        Colis.countDocuments({ status: "en cours", id_userA: id }),
        Colis.countDocuments({ status: "arrive", id_userA: id }),
        Colis.countDocuments({ status: "retire", id_userA: id }),
        Colis.countDocuments({ id_userA: id }), // Compte tous les colis de cet utilisateur
      ]);
  
      // Préparer un objet contenant les comptes de chaque statut
      const result = {
        demande: statusCounts[0],
        depot: statusCounts[1],
        charge: statusCounts[2],
        enCours: statusCounts[3],
        arrive: statusCounts[4],
        retire: statusCounts[5],
        all_colis: statusCounts[6],
      };
  
      res.status(200).json(result); // Retourne l'objet avec les comptes
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur lors de la récupération des données." });
    }
};
  
const countColisByStatusForAgence = async (req, res) => {
    const { id_agence } = req.params; // Récupérer l'ID de l'agence depuis les paramètres de la requête
  
    try {
      // Vérifier si l'ID de l'agence est fourni
      if (!id_agence) {
        return res.status(400).json({ message: "L'ID de l'agence est requis." });
      }
  
      // Compter le nombre de colis pour chaque statut spécifique à l'agence
      const statusCounts = await Promise.all([
        Colis.countDocuments({ status: "demande", id_agence }),
        Colis.countDocuments({ status: "depot", id_agence }),
        Colis.countDocuments({ status: "charge", id_agence }),
        Colis.countDocuments({ status: "en cours", id_agence }),
        Colis.countDocuments({ status: "arrive", id_agence }),
        Colis.countDocuments({ status: "retire", id_agence }),
        Colis.countDocuments({ id_agence }), // Compte tous les colis de cette agence
      ]);
  
      // Préparer un objet contenant les comptes de chaque statut
      const result = {
        demande: statusCounts[0],
        depot: statusCounts[1],
        charge: statusCounts[2],
        enCours: statusCounts[3],
        arrive: statusCounts[4],
        retire: statusCounts[5],
        all_colis: statusCounts[6],
      };
  
      res.status(200).json(result); // Retourne l'objet avec les comptes
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur lors de la récupération des données." });
    }
  };

const colisByClient = async (req, res) => {
    try {
      const { id } = req.params; // Récupérer l'ID de l'utilisateur depuis les paramètres
  
      // Rechercher les colis associés à id_userA (l'ID reçu en paramètre)
      const colis = await Colis.find({ id_userA: id, completed: true })
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
        .sort({ createdAt: -1 }); // Trier par date de création (descendant)
  
      // Vérifier si des colis ont été trouvés
      if (!colis || colis.length === 0) {
        return res.status(404).json({ message: 'Aucun colis trouvé pour cet utilisateur' });
      }
  
      // Retourner les colis trouvés
      res.status(200).json(colis);
  
    } catch (error) {
      console.log(error);
      res.status(500).send('Une erreur est survenue lors de la récupération des colis.');
    }
};
  

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
    colis_change_status,
    countColisByStatus,
    countColisByStatusForUser,
    countColisByStatusForAgence,
    colisByClient,
    new_colis
}

