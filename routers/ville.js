
const express = require('express')
const { all_ville, add_ville } = require('../controllers/ville')
const router = express.Router()


router.get('/ville', all_ville)
router.post('/ville', add_ville)

module.exports = router   
