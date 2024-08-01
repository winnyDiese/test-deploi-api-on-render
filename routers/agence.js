
const express = require('express')
const Agence = require('../models/agence')
const router = express.Router()

// router.route('/').get(async (req,res)=>{
//     try {
//         const agences = await Agence.find()
//         res.json(agences)
//     } catch (error) {
//         res.status(500).send(error.message)
//     }
// })

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
