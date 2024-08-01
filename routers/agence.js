
const express = require('express')
const { all_agence } = require('../controllers/agence')
const router = express.Router()


router.get('/agence', all_agence)

module.exports = router
