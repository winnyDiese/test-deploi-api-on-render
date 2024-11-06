const Message = require('../models/message');

// Get all messages
const all_messages = async (req, res) => {
    try {
        const messages = await Message.find();
        res.status(200).json(messages);
    } catch (error) {
        console.log(error);
        res.status(500).send('An error occurred!');
    }
};

// Add a new message
const add_message = async (req, res) => {
    const { dateNotif, id_user_notif, names, tel, email, message } = req.body;

    if (!dateNotif || !id_user_notif || !names || !message) {
        return res.status(402).send("All fields are required!");
    }

    try {
        const new_message = new Message({ dateNotif, id_user_notif, names, tel, email, message });
        const saved_message = await new_message.save();
        res.status(201).json(saved_message);
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    }
};

// Get a message by ID
const message_by_id = async (req, res) => {
    const { id } = req.params;

    try {
        const message = await Message.findById(id);
        if (!message) return res.status(404).send('Message not found!');

        res.status(200).json(message);
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    }
};

// Delete a message by ID
const delete_message = async (req, res) => {
    const { id } = req.params;

    try {
        const deleted_message = await Message.findByIdAndDelete(id);

        if (!deleted_message) return res.status(404).json({ message: 'Message not found!' });
        res.status(200).json({ message: 'Message successfully deleted!', messageData: deleted_message });
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    }
};

// Update a message by ID
const update_message = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const updated_message = await Message.findByIdAndUpdate(id, updates, { new: true });
        if (!updated_message) return res.status(404).json({ message: "Message not found!" });

        res.status(200).json({ message: "Message successfully updated!", messageData: updated_message });
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    }
};

module.exports = { all_messages, add_message, message_by_id, delete_message, update_message };
