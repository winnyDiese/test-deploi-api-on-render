
// import mongoose,  { Schema } from "mongoose"
const mongoose = require('mongoose')

const villeSchema = new mongoose.Schema({ 
    // name: String,
    // contry: String

    nomVille:String,
    id_pays:String
    
},{ timestamps: true })

const Ville = mongoose.models.Ville || mongoose.model('Ville', villeSchema)
// export default Ville

module.exports = Ville

