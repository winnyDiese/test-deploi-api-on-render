

const mongoose = require('mongoose')
const User = require('../models/user')
const UserExtension = require('../models/userExtension')


const all_user = async (req,res)=>{
    try {
        const users = await User.find().sort({_id:-1})
        res.status(200).json(users)
    } catch (error) {
        console.log(error)
        res.status(500).send('Une erreur est survenus !')
    }
}

const get_agents_sendango = async (req, res) => {
    try {
      // Recherche des utilisateurs ayant le rôle 'agent_sendango'
      const agents = await User.find({ role: "agent_sendango" }).sort({ _id: -1 });
  
      // Vérification si des agents ont été trouvés
      if (agents.length === 0) {
        return res.status(404).json({ message: "Aucun agent Sendango trouvé." });
      }
  
      res.status(200).json(agents);  // Retourne la liste des agents trouvés
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur lors de la récupération des agents Sendango." });
    }
  };

const get_client = async (req, res) => {
    try {
        // Recherche des utilisateurs ayant le rôle 'agent_sendango'
        const agents = await User.find({ role: "client" }).sort({ _id: -1 });

        // Vérification si des agents ont été trouvés
        if (agents.length === 0) {
        return res.status(404).json({ message: "Aucun agent Sendango trouvé." });
        }

        res.status(200).json(agents);  // Retourne la liste des agents trouvés
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la récupération des agents Sendango." });
    }
};

const get_beneficiaire = async (req, res) => {
    try {
        // Recherche des utilisateurs ayant le rôle 'agent_sendango'
        const agents = await User.find({ role: "beneficiaire" }).sort({ _id: -1 });

        // Vérification si des agents ont été trouvés
        if (agents.length === 0) {
        return res.status(404).json({ message: "Aucun agent Sendango trouvé." });
        }

        res.status(200).json(agents);  // Retourne la liste des agents trouvés
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la récupération des agents Sendango." });
    }
};
  
const get_agent_agence = async (req, res) => {
    try {
        // Recherche des utilisateurs ayant le rôle 'agent_sendango'
        const agents = await User.find({ role: "agent_agence" }).sort({ _id: -1 });

        // Vérification si des agents ont été trouvés
        if (agents.length === 0) {
        return res.status(404).json({ message: "Aucun agent Sendango trouvé." });
        }

        res.status(200).json(agents);  // Retourne la liste des agents trouvés
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la récupération des agents Sendango." });
    }
};
  
const add_agent_sendango = async (req, res) => {
    const { nomUser, fonctionAgent, phoneUser, passwordUser, emailUser, adresseUser, sexe, id_typeUser, id_ville, statutUser,role } = req.body;
  
    // Création d'un nouvel utilisateur basé sur les données reçues
    const newUser = new User({
      nomUser,
      fonctionAgent,
      phoneUser,
      passwordUser,
      emailUser,
      adresseUser,
      sexe,
      id_typeUser,
      id_ville,
      statutUser,
      role
    });
  
    try {
      // Sauvegarde du nouvel utilisateur dans la base de données
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);  // Retourne l'utilisateur ajouté avec un statut de succès
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur lors de l'ajout de l'utilisateur." });
    }
  };

const add_user = async (req, res) => {
    const {
        nomUser,
        fonctionAgent,
        phoneUser,
        passwordUser,
        emailUser,
        adresseUser,
        sexe,
        id_typeUser,
        id_ville,
        statutUser,
        id_extension,
        role
    } = req.body;

    try {
        // Vérifier si un utilisateur avec le même phoneUser existe déjà
        const existingUser = await User.findOne({ phoneUser });

        if (existingUser) {
            // Si l'utilisateur existe déjà, ne pas créer de nouvel utilisateur ni UserExtension
            return res.status(400).json({ message: 'Un utilisateur avec ce numéro de téléphone existe déjà !' });
        }

        // Création d'un nouvel utilisateur
        const new_user = new User({
            nomUser,
            fonctionAgent,
            phoneUser,
            passwordUser,
            emailUser,
            adresseUser,
            sexe,
            id_typeUser,
            id_ville,
            statutUser,
            role
        });

        console.log('data user : '+new_user)

        // Enregistrement de l'utilisateur dans la base de données
        const saved_user = await new_user.save();

        // Création de l'objet UserExtension avec l'id de l'utilisateur et l'id d'extension
        const new_user_extension = new UserExtension({
            id_user: saved_user._id,
            id_extension
        });

        console.log('data user-extension : '+new_user_extension)

        // Enregistrement de l'objet UserExtension dans la base de données
        await new_user_extension.save();

        // Réponse avec l'utilisateur enregistré et l'objet UserExtension
        res.status(201).json({
            user: saved_user,
            user_extension: new_user_extension
        });

    } catch (error) {
        if (error.code === 11000) {
            // Gestion des erreurs de doublon
            const field = Object.keys(error.keyValue)[0];
            res.status(400).json({ message: `${field} existe déjà !` });
        } else {
            // Gestion des autres erreurs
            res.status(500).json({ message: 'Une erreur est survenue !', error: error.message });
        }
    }
}


const delete_user = async (req,res) => {
    const { id } = req.params;
    try {
        const deleted_user = await User.findByIdAndDelete(id)

        if (!deleted_user) return res.status(404).json({ message: 'Utitlisateur non trouvé !' });
        res.status(200).json({ message: 'Un utilisateur a été supprimé avec sucées !', user: deleted_user });

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }

}

const update_user = async (req,res) => {
    
    try {
        const {id} = req.params
        const {nomUser, fonctionAgent, phoneUser, passwordUser, emailUser, adresseUSer, sexe, id_typeUser, id_ville, statutUser } = req.body

        const phoneExist = await User.findOne({phoneUser})
        if(phoneExist && phoneExist._id.toString() !== id)  return res.status(400).json({ message: 'Numero de telephone existe déjà.' });


        const updated_user = await User.findByIdAndUpdate(
            id, 
            {nomUser, fonctionAgent, phoneUser, passwordUser, emailUser, adresseUSer, sexe, id_typeUser, id_ville, statutUser }, 
            {new:true}
        )

        if(!updated_user) return res.status(404).json({message:"Utilisateur non trouvé"})
        
        res.status(200).json({message:"Utilisateur mise à jour avec succées !", user: updated_user})
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}

const one_user = async (req,res)=>{
    const { id } = req.params;

    try {
        const user = await User.findById(id)
    
        if (!user) return res.status(404).json({ message: 'Utilisateur non, trouvé !' });
        res.status(200).json(user)

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}

const one_user_by_tel = async (req,res)=>{
    const { tel } = req.params;
    console.log(tel)

    try {
        const user = await User.findOne({phoneUser:tel})
    
        if (!user) return res.status(404).json({ message: 'Utilisateur non, trouvé !' });
        res.status(200).json(user)

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}

const one_user_by_type_user = async (req,res)=>{
    const { type } = req.params;

    try {
        const user = await User.find({id_typeUser:type})
    
        if (!user) return res.status(404).json({ message: 'Utilisateur non, trouvé !' });
        res.status(200).json(user)

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}

const one_user_by_status = async (req,res)=>{
    const { statut } = req.params;

    try {
        const user = await User.find({statutUser:statut})
    
        if (!user) return res.status(404).json({ message: 'Utilisateur non, trouvé !' });
        res.status(200).json(user)

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}

const create_juste_user = async (req, res) => {
    const {
        nomUser,
        fonctionAgent,
        phoneUser,
        passwordUser,
        emailUser,
        adresseUser,
        sexe,
        id_typeUser,
        id_ville,
        statutUser
    } = req.body;

    try {
        // Vérifier si un utilisateur avec le même numéro de téléphone existe déjà
        const existingUser = await User.findOne({ phoneUser });

        if (existingUser) {
            return res.status(400).json({ message: 'Un utilisateur avec ce numéro de téléphone existe déjà !' });
        }

        // Créer un nouvel utilisateur
        const new_user = new User({
            nomUser,
            fonctionAgent,
            phoneUser,
            passwordUser,
            emailUser,
            adresseUser,
            sexe,
            id_typeUser,
            id_ville,
            statutUser
        });

        console.log('Nouveau utilisateur :', new_user);

        // Enregistrer le nouvel utilisateur dans la base de données
        const saved_user = await new_user.save();

        // Réponse avec l'utilisateur enregistré
        res.status(201).json({ user: saved_user });

    } catch (error) {
        if (error.code === 11000) {
            // Gestion des erreurs de doublon
            const field = Object.keys(error.keyValue)[0];
            res.status(400).json({ message: `${field} existe déjà !` });
        } else {
            // Gestion des autres erreurs
            res.status(500).json({ message: 'Une erreur est survenue !', error: error.message });
        }
    }
}

const login = async (req,res)=>{
    const {phoneUser, passwordUser} = await req.body

    try {
        const user = await User.findOne({phoneUser,passwordUser})
        if(!user) res.status(401).send('Mot de passe ou numéro de télephone non valide...')

        const authToken = await user.generateAuthToken()
        
        // Répondre avec le token et les informations de l'utilisateur
        res.status(200).json({ sec, authToken })

    } catch (error) {
        console.log(error)
        res.status(500).send('Erreur de mot de passe...')
    }
}

module.exports = {
    all_user, 
    get_client,
    get_beneficiaire,
    get_agents_sendango,
    get_agent_agence,
    add_agent_sendango,
    add_user, 
    login, 
    one_user,
    delete_user,update_user,
    one_user_by_tel,
    one_user_by_type_user,
    one_user_by_status,
    create_juste_user
}
