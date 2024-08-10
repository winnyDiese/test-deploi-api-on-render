
import mongoose, {Schema}  from "mongoose"

const destinationSchema = new Schema({
    // villeA: String,
    // villeB: String

    id_villeA:String,
    id_villeB:String
},{ timestamps: true })

const Destination = mongoose.models.Destination || mongoose.model('Destination',destinationSchema)
export default Destination
