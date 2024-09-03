
const Ville = require('../models/ville')



const all_ville = async (req,res)=>{
    try {
        const ville = await Ville.find()
        res.status(200).json(ville)
    } catch (error) {
        console.log(error)
        res.status(500).send('Une erreur est survenus !')
    }
}


const add_ville = async (req,res)=>{
    const {nomVille, id_pays} = await req.body

    if((!nomVille || nomVille.trim() === '') && (!id_pays || id_pays.trim() === '')) return res.status(402).send("Les données sont obligatoire !")

    try {
        const new_ville = new Ville({nomVille, id_pays})
        const saved_ville = await new_ville.save()
        return res.status(201).json(saved_ville)
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}


const city_by_contry = async (req,res)=>{
    const id_pays = req.params.id

    try {
        const cities = await Ville.findOne({id_pays})
        if(!cities) return res.status(404).send('Ville non trouvée !')

        res.status(201).json(cities)
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}


const delete_city = async (req,res) => {
    const { id } = req.params;
    try {
        const deleted_city = await Ville.findByIdAndDelete(id)

        if (!deleted_city) return res.status(404).json({ message: 'Ville non, trouvé !' });
        res.status(200).json({ message: 'Une ville a été supprimée avec sucées !', ville: deleted_city });

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }

}

const update_city = async (req,res) => {
    
    try {
        const {id} = req.params
        const updates = req.body

        const updated_contry = await Ville.findByIdAndUpdate(id, updates, {new:true})
        if(!updated_contry) return res.status(404).json({message:"Ville non trouvé !"})
        
        res.status(200).json({message:"Vile=le mise à jour avec succées !", pays: updated_contry})
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}

const one_city = async (req,res) => {
    const { id } = req.params

    try {
        const city = await Ville.findById(id)
        if (!city) return res.status(404).json({ message: 'Ville non, trouvé !' });
        const ville = city
        res.status(200).json(ville)

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }

}



module.exports = {all_ville, add_ville, city_by_contry,delete_city,update_city,one_city }