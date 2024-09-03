

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
        // Recherche tous les comptes associés à l'agence par son ID
        const comptes = await Compte.find({ id_agence });

        if (comptes.length === 0) {
            return res.status(404).json({ message: 'No accounts found for this agency' }); // Renvoie une erreur si aucun compte n'est trouvé
        }

        res.status(200).json(comptes); // Renvoie la liste des comptes trouvés
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message }); // Renvoie une erreur en cas de problème avec la requête
    }
};


module.exports = {all_compte, add_compte, delete_compte, update_compte, one_compte, get_comptes_by_agence}
