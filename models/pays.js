
// import mongoose, {Schema}  from "mongoose"
const mongoose = require('mongoose')

const paysSchema = new mongoose.Schema({
    // name: String,
    // indicateur: String

    nomPays:String,
    indicatif:String
},{ timestamps: true })

const Pays = mongoose.models.Pays || mongoose.model('Pays',paysSchema)
// export default Pays

module.exports = Pays

