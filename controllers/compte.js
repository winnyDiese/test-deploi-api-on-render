

const Agence = require('../models/agence')
const Compte = require('../models/compte')


const all_compte = async (req,res)=>{
    try {
        const comptes = await Compte.find()
        res.status(200).json(comptes)
    } catch (error) {
        console.log(error)
        res.status(500).send('Une erreur est survenus !')
    }
}

const add_compte = async (req,res) => {
    const {dateCompte, typeCompte, montantCompte, solde, id_agence, id_user} = await req.body
    const new_compte = new Compte({dateCompte, typeCompte, montantCompte, solde, id_agence, id_user})
    
    try {
        const saved_compte = await new_compte.save()
        res.status(201).json(saved_compte)
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}

const delete_compte = async (req,res) => {
    const { id } = req.params;
    try {
        const deleted_compte = await Compte.findByIdAndDelete(id)

        if (!deleted_compte) return res.status(404).json({ message: 'compte non, trouvé !' });
        res.status(200).json({ message: 'Un compte a été supprimé avec sucées !', compte: deleted_compte });

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }

}

const update_compte = async (req,res) => {
    
    try {
        const {id} = req.params
        const updates = req.body

        const updated_compte = await Compte.findByIdAndUpdate(id, updates, {new:true})
        if(!updated_compte) return res.status(404).json({message:"compte non trouvé !"})
        
        res.status(200).json({message:"compte mise à jour avec succées !", compte: updated_compte})
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}

const one_compte = async (req,res) => {
    const { id } = req.params
    
    try {
        const compte = await Compte.findById(id)
    
        if (!compte) return res.status(404).json({ message: 'compte non, trouvé !' });
        res.status(200).json(compte)

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }

}

const get_comptes_by_agence = async (req, res) => {
    const { id_agence } = req.params; // Récupère l'ID de l'agence depuis les paramètres de la requête

    try {
        // Recherche les comptes associés à l'agence et inclut les détails de l'agence
        const comptes = await Compte.find({ id_agence }).populate('id_agence')
        .sort({ _id: -1 })

        if (comptes.length === 0) {
            return res.status(404).json({ message: 'No accounts found for this agency' }); // Renvoie une erreur si aucun compte n'est trouvé
        }

        res.status(200).json(comptes); // Renvoie la liste des comptes avec les détails de l'agence
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message }); // Renvoie une erreur en cas de problème avec la requête
    }
};

const update_and_add_montant_compte_by_agencex = async (req, res) => {
    const { id_agence } = req.params; // ID de l'agence pour laquelle vous souhaitez mettre à jour ou créer le compte
    const { montantCompte, dateCompte, typeCompte, solde, id_user } = req.body; // Nouveau montant à ajouter et autres champs nécessaires

    try {
        // Recherchez un compte associé à l'agence spécifique
        let compte = await Compte.findOne({ id_agence });

        if (compte) {
            // Si un compte existe, additionnez le montant actuel avec le nouveau montant
            // const nouveauMontant = parseFloat(compte.solde) + parseFloat(montantCompte);
            const nouveauMontant = parseFloat(compte.solde || 0) + parseFloat(montantCompte);


            // Mettez à jour le montant du compte trouvé
            compte.montantCompte = montantCompte; // Convertir en chaîne si nécessaire  
            compte.dateCompte = dateCompte; // Mettre à jour les autres champs si nécessaire
            compte.typeCompte = "Vente";
            compte.solde = nouveauMontant.toString();
            compte.id_user = id_user;

            const updatedCompte = await compte.save();
            return res.status(200).json(updatedCompte);
        } else {
            // Si aucun compte n'existe pour cette agence, créez un nouveau compte
            const new_compte = new Compte({
                dateCompte,
                typeCompte,
                montantCompte, // Le montant initial est celui reçu
                solde: montantCompte,
                id_agence,
                id_user
            });

            const saved_compte = await new_compte.save();
            return res.status(201).json(saved_compte);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

const update_and_add_montant_compte_by_agence = async (req, res) => {
    const { id_agence } = req.params; // ID de l'agence pour laquelle vous souhaitez créer un nouveau compte
    const { montantCompte, dateCompte, id_user } = req.body; // Nouveau montant à ajouter et autres champs nécessaires

    try {
        // Vérifiez d'abord si l'agence existe
        const agence = await Agence.findById(id_agence);
        
        if (!agence) {
            return res.status(404).json({ message: 'Agence not found' });
        }

        // Mettre à jour le solde de l'agence
        agence.solde = parseFloat(agence.solde || 0) + parseFloat(montantCompte);

        // Sauvegarder la mise à jour de l'agence avant de créer le compte
        const updatedAgence = await agence.save();

        // Créer un nouveau compte avec le montant et le solde mis à jour de l'agence
        const new_compte = new Compte({
            dateCompte,
            typeCompte: "Vente", // Le type est toujours "Vente"
            montantCompte, // Le montant ajouté
            solde: updatedAgence.solde, // Utiliser le solde mis à jour de l'agence
            id_agence, // Lier le compte à l'agence
            id_user // Lier l'utilisateur à la transaction
        });

        // Sauvegarder le nouveau compte
        const saved_compte = await new_compte.save();

        // Retourner les informations du compte et de l'agence mis à jour
        return res.status(201).json({ saved_compte, updatedAgence });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};


module.exports = {all_compte, add_compte, delete_compte, update_compte, one_compte, get_comptes_by_agence, update_and_add_montant_compte_by_agence}
