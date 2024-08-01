
const express = require('express')
const { all_agence, add_agence } = require('../controllers/agence')
const router = express.Router()


router.get('/agence', all_agence)
router.post('/agence', add_agence)

module.exports = router
