
import mongoose, {Schema}  from "mongoose"

const typeuserSchema = new Schema({
   
    nomType:String
},{ timestamps: true })

const Typeuser = mongoose.models.Typeuser || mongoose.model('Typeuser',typeuserSchema)
export default Typeuser
