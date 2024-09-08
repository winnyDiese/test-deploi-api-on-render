

const Utilisation = require('../models/utilisation')
const Colis = require('../models/colis')



const all_using = async (req,res)=>{
    try {
        const utilisations = await Utilisation.find()
        res.status(200).json(utilisations)
    } catch (error) {
        console.log(error)
        res.status(500).send('Une erreur est survenus !')
    }
}

const add_using = async (req,res) => {
    const {id_compte, id_colis, montantRetire} = await req.body
    const new_using = new Utilisation({id_compte, id_colis, montantRetire})
    
    try {
        const saved_using = await new_using.save()
        res.status(201).json(saved_using)
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}

const delete_using = async (req,res) => {
    const { id } = req.params;
    try {
        const deleted_using = await Utilisation.findByIdAndDelete(id)

        if (!deleted_using) return res.status(404).json({ message: 'using non, trouvé !' });
        res.status(200).json({ message: 'Un using a été supprimé avec sucées !', utilisation: deleted_using });

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }

}

const update_using = async (req,res) => {
    
    try {
        const {id} = req.params
        const updates = req.body

        const updated_using = await Utilisation.findByIdAndUpdate(id, updates, {new:true})
        if(!updated_using) return res.status(404).json({message:"using non trouvé !"})
        
        res.status(200).json({message:"using mise à jour avec succées !", utilisation: updated_using})
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}

const one_using = async (req,res) => {
    const { id } = req.params;
    try {
        const using = await Utilisation.findById(id)
    
        if (!using) return res.status(404).json({ message: 'using non, trouvé !' });
        res.status(200).json(using)

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }

}

const using_agence = async (req, res) => {
    const { id_compte } = req.params; // Get the Compte ID from the request parameters

    try {
        // Find all utilisations associated with the given id_compte
        const utilisations = await Utilisation.find({ id_compte });

        if (!utilisations.length) {
            return res.status(404).json({ message: 'Aucune utilisation trouvée pour ce compte.' });
        }

        // Fetch details for each colis associated with the utilisations
        const colisDetails = await Promise.all(
            utilisations.map(async (utilisation) => {
                const colis = await Colis.findById(utilisation.id_colis)
                    .populate('id_userA')
                    .populate('id_userB')
                    .populate('id_agence')
                    .populate({
                        path: 'id_destination',  // Populate the id_destination field
                        populate: [
                            { path: 'id_villeA' },  // Nested populate for id_villeA within id_destination
                            { path: 'id_villeB' }   // Nested populate for id_villeB within id_destination
                        ]
                    });

                return {
                    ...utilisation._doc,
                    colis: colis || null // Add the colis details to the utilisation
                };
            })
        );

        res.status(200).json(colisDetails);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};




module.exports = {all_using, add_using, delete_using, update_using, one_using, using_agence}
