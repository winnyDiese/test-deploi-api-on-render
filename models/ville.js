
import mongoose,  { Schema } from "mongoose"

const villeSchema = new Schema({ 
    // name: String,
    // contry: String

    nomVille:String,
    id_pays:String
    
},{ timestamps: true })

const Ville = mongoose.models.Ville || mongoose.model('Ville', villeSchema)
export default Ville

