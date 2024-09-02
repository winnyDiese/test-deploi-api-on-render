const mongoose = require('mongoose');

const userExtensionSchema = new mongoose.Schema({
    id_user: {
        type: mongoose.Schema.Types.ObjectId, // Utilisation d'un ObjectId pour référencer un document
        ref: 'User', // Référence à la collection User
        required: true
    },
    id_extension: {
        type: mongoose.Schema.Types.ObjectId, // Utilisation d'un ObjectId pour référencer un document
        ref: 'Extension', // Référence à la collection Extension
        required: true
    }
}, { timestamps: true });

const UserExtension = mongoose.models.UserExtension || mongoose.model('UserExtension', userExtensionSchema);
module.exports = UserExtension;
