
const mongoose = require('mongoose')
const { Schema } = mongoose;

const agenceDestinationSchema = new mongoose.Schema({
    // villeA: String,
    // villeB: String

    id_agence: {
        type: Schema.Types.ObjectId,
        ref: 'Agence', // Reference to the Agence collection
        required: true
    },
    id_destination: {
        type: Schema.Types.ObjectId,
        ref: 'Destination', // Reference to the Destination collection
        required: true
    },
    statutDest:String
    
},{ timestamps: true })

const AgenceDestination = mongoose.models.AgenceDestination || mongoose.model('AgenceDestination',agenceDestinationSchema)
module.exports = AgenceDestination
