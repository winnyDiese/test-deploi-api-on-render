
const express = require('express')
const { all_ville, add_ville, city_by_contry } = require('../controllers/ville')
const router = express.Router()


router.get('/ville', all_ville)
router.post('/ville', add_ville)
router.get('/ville/pays/:id', city_by_contry)

module.exports = router   
