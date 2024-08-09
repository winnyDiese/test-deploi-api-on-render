

const connect_mongodb = require('../lib/connect_db')
const User = require('../models/user')


connect_mongodb()

const all_user = async (req,res)=>{
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        console.log(error)
        res.status(500).send('Une erreur est survenus !')
    }
}

const add_user = async (req,res)=>{
    const {nomUser, fonctionAgent, phoneUser, passwordUser, emailUser, adresseUSer, sexe, id_typeUser, id_ville, statutUser } = await req.body
    const new_user = new User({nomUser, fonctionAgent, phoneUser, passwordUser, emailUser, adresseUSer, sexe, id_typeUser, id_ville, statutUser })

    try {
        const saved_user = await new_user.save()
        res.status(201).json(saved_user)
    } catch (error) {

        if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0];
            res.status(400).json({ message: `${field} existe déjà !` });
          } else {
            res.status(500).json({ message: 'Une erreur est survenue !', error: error.message });
          }

    }
}

const user_login = async (req,res)=>{
    const {phoneUser, passwordUser} = await req.body

    try {
        const user = await User.findOne({phoneUser,passwordUser})
        if(!user) res.status(401).send('Mot de passe ou numéro de télephone non valide...')
        
        res.status(201).json(user)
    } catch (error) {
        console.log(error)
        res.status(500).send('Erreur de mot de passe...')
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
        const user = await User.findOne({tel:tel})
    
        if (!user) return res.status(404).json({ message: 'Utilisateur non, trouvé !' });
        res.status(200).json(user)

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}


module.exports = {all_user, add_user, user_login, one_user,delete_user,update_user,one_user_by_tel}
