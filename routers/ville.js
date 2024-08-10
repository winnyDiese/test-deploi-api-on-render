
const express = require('express')
const { all_ville, add_ville, city_by_contry,delete_city,update_city,one_city } = require('../controllers/ville')
const router = express.Router()


router.get('/ville', all_ville)
router.post('/ville', add_ville)
router.delete('/ville/:id', delete_city)
router.put('/ville/:id', update_city)

router.get('/ville/:id', one_city)
router.get('/ville/pays/:id', city_by_contry)

module.exports = router   

