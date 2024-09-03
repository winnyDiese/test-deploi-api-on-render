

const UserExtension = require('../models/userExtension')


const all_use_exten = async (req,res)=>{
    try {
        const use_exten = await UserExtension.find()
        .populate('id_user') // Récupère les détails de l'utilisateur
        // .populate('id_extension') // Récupère les détails de l'extension

        res.status(200).json(use_exten)
    } catch (error) {
        console.log(error)
        res.status(500).send('Une erreur est survenus !')
    }
}

const add_use_exten = async (req,res)=>{
    const {id_user, id_extension} = await req.body
    
    const new_use_exten = new UserExtension({id_user, id_extension})

   


    try {
        const saved_use_exten = await new_use_exten.save()
        res.status(201).json(saved_use_exten)
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}

const delete_use_exten = async (req,res) => {
    const { id } = req.params;
    try {
        const deleted_use_exten = await UserExtension.findByIdAndDelete(id)

        if (!deleted_use_exten) return res.status(404).json({ message: 'use_exten non, trouvé !' });
        res.status(200).json({ message: 'Un use_exten a été supprimé avec sucées !', use_exten: deleted_use_exten });

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }

}

const update_use_exten = async (req,res) => {
    
    try {
        const {id} = req.params
        const updates = req.body

        const updated_use_exten = await UserExtension.findByIdAndUpdate(id, updates, {new:true})
        if(!updated_use_exten) return res.status(404).json({message:"Use_exten non trouvé !"})
        
        res.status(200).json({message:"Use_exten mise à jour avec succées !", use_exten: updated_use_exten})
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}

const one_use_exten = async (req,res) => {
    const { id } = req.params;
    try {
        const use_exten = await UserExtension.findById(id)
    
        if (!use_exten) return res.status(404).json({ message: 'use_exten non, trouvé !' });
        res.status(200).json(use_exten)

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }

}

const use_exten_byuser = async (req,res) => {
    const { id } = req.params;
    try {
        const use_exten = await UserExtension.find({id_user:id})
    
        if (!use_exten) return res.status(404).json({ message: 'use_exten non, trouvé !' });
        res.status(200).json(use_exten)

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }

}

const use_exten_byextension = async (req,res) => {
    const { id } = req.params;
    try {
        const use_exten = await UserExtension.find({id_extension:id}).populate('id_user')
    
        if (!use_exten) return res.status(404).json({ message: 'use_exten non, trouvé !' });
        res.status(200).json(use_exten)

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }

}

const get_users_by_extension = async (req, res) => {
    const { id_extension } = req.params; // Récupère l'ID de l'extension depuis les paramètres de la requête

    try {
        // Recherche tous les utilisateurs associés à l'extension par son ID
        const users = await UserExtension.find({ id_extension });

        if (users.length === 0) {
            return res.status(404).json({ message: 'No users found for this extension' }); // Renvoie une erreur si aucun utilisateur n'est trouvé
        }

        res.status(200).json(users); // Renvoie la liste des utilisateurs trouvés
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message }); // Renvoie une erreur en cas de problème avec la requête
    }
};


module.exports = {all_use_exten, add_use_exten,one_use_exten,delete_use_exten,update_use_exten,use_exten_byuser,use_exten_byextension,get_users_by_extension}
