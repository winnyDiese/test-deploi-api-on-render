

const Status = require('../models/status')



const all_status = async (req,res)=>{
    try {
        const statuss = await Status.find()
        res.status(200).json(statuss)
    } catch (error) {
        console.log(error)
        res.status(500).send('Une erreur est survenus !')
    }
}

const add_status = async (req,res) => {
    const {name} = await req.body
    const new_status = new Status( {name})
    
    try {
        const saved_status = await new_status.save()
        res.status(201).json(saved_status)
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}

const delete_status = async (req,res) => {
    const { id } = req.params;
    try {
        const deleted_status = await Status.findByIdAndDelete(id)

        if (!deleted_status) return res.status(404).json({ message: 'Status non, trouvé !' });
        res.status(200).json({ message: 'Un Status a été supprimé avec sucées !', status: deleted_status });

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }

}

const update_status = async (req,res) => {
    
    try {
        const {id} = req.params
        const updates = req.body

        const updated_status = await Status.findByIdAndUpdate(id, updates, {new:true})
        if(!updated_status) return res.status(404).json({message:"Status non trouvé !"})
        
        res.status(200).json({message:"Status mise à jour avec succées !", status: updated_status})
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}

const one_status = async (req,res) => {
    const { id } = req.params;
    try {
        const status = await Status.findById(id)
    
        if (!status) return res.status(404).json({ message: 'Status non, trouvé !' });
        res.status(200).json(status)

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }

}



module.exports = {all_status, add_status, delete_status, update_status, one_status}
