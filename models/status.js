
const mongoose = require('mongoose')

const statusSchema = new mongoose.Schema({
    name: String
},{ timestamps: true })

const Status = mongoose.models.Status || mongoose.model('Status',statusSchema)
module.exports = Status
