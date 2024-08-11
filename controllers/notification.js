

const connect_mongodb = require('../lib/connect_db')
const Notification = require('../models/notification')


connect_mongodb()

const all_notification = async (req,res)=>{
    try {
        const notification = await Notification.find()
        res.status(200).json(notification)
    } catch (error) {
        console.log(error)
        res.status(500).send('Une erreur est survenus !')
    }
}

const add_notification = async (req,res)=>{
    const {dateNotif, id_user, message} = await req.body
    
    const new_notification = new Notification({dateNotif, id_user, message})

    try {
        const saved_notification = await new_notification.save()
        res.status(201).json(saved_notification)
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}

const delete_notification = async (req,res) => {
    const { id } = req.params;
    try {
        const deleted_notification = await Notification.findByIdAndDelete(id)

        if (!deleted_notification) return res.status(404).json({ message: 'notification non, trouvé !' });
        res.status(200).json({ message: 'Un notification a été supprimé avec sucées !', notification: deleted_notification });

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }

}

const update_notification = async (req,res) => {
    
    try {
        const {id} = req.params
        const updates = req.body

        const updated_notification = await Notification.findByIdAndUpdate(id, updates, {new:true})
        if(!updated_notification) return res.status(404).json({message:"Notification non trouvé !"})
        
        res.status(200).json({message:"Notification mise à jour avec succées !", notification: updated_notification})
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}

const one_notification = async (req,res) => {
    const { id } = req.params;
    try {
        const notification = await Notification.findById(id)
    
        if (!notification) return res.status(404).json({ message: 'notification non, trouvé !' });
        res.status(200).json(notification)

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }

}

module.exports = {all_notification, add_notification,one_notification,delete_notification,update_notification}
