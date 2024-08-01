
const express = require('express')
const router = express.Router()

router.route('/agence').get(async (req,res)=>{
    try {
        const agences = await Agence.find()
        res.json(agences)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

module.exports = router
