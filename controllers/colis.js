
const Colis = require('../models/colis')
const User = require('./models/User'); // Import the User model



const all_colis = async (req,res)=>{
    try {
        const colis = await Colis.find()
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
        id_tarif
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
        id_tarif
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
    const { id } = req.params

    try {
        const colis = await Colis.find({codeColis:id})
    
        if (!colis) return res.status(404).json({ message: 'Colis non, trouvé !' });
        res.status(200).json(colis)

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


// const Colis = require('./models/Colis'); // Assuming the Colis model is defined elsewhere

const update_colis_my_data = async (req, res) => {
    try {
        const { id } = req.params; // Get the colis ID from the request parameters
        const { nomUser, phoneUser, adresseUser  } = req.body; // Extract user data from the request body

        // Create a new user with the provided information
        const newUser = new User({
            nomUser,
            phoneUser,
            adresseUser
        });

        // Save the new user to the database
        const savedUser = await newUser.save();

        // Add the new user's ID to the update object
        const updates = {
            id_userA: savedUser._id
        };

        // Find the colis by ID and update it with the new information
        const updated_colis = await Colis.findByIdAndUpdate(id, updates, { new: true });

        if (!updated_colis) {
            return res.status(404).json({ message: "Colis non trouvé !" });
        }

        res.status(200).json({ message: "Colis mis à jour avec succès !", colis: updated_colis });
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    }
};

module.exports = update_colis;



module.exports = {all_colis, add_colis,delete_colis,update_colis,one_colis,colis_bycode,colis_byuser_a,colis_byuser_b, update_colis_my_data}
