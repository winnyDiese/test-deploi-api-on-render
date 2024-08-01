
const express = require('express')
const Agence = require('../models/agence')
const connect_mongodb = require('../lib/connect_db')
const router = express.Router()

connect_mongodb()

router.get('/', async (req,res)=>{
    try {
        try {
            const agences = await Agence.find()
            res.json(agences)
        } catch (error) {
            res.status(500).send(error.message)
        }
    } catch (error) {
        
    }
})

module.exports = router
