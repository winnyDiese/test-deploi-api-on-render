
const mongoose = require('mongoose')

const typeuserSchema = new mongoose.Schema({
    nomType:String
},{ timestamps: true })

const Typeuser = mongoose.models.Typeuser || mongoose.model('Typeuser',typeuserSchema)

module.exports = Typeuser
