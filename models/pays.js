
import mongoose, {Schema}  from "mongoose"

const paysSchema = new Schema({
    // name: String,
    // indicateur: String


    nomPays:String,
    indicatif:String
},{ timestamps: true })

const Pays = mongoose.models.Pays || mongoose.model('Pays',paysSchema)
// export default Pays

module.exports = Pays

