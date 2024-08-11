
const express = require('express')
const { all_colis, add_colis,one_colis,delete_colis,update_colis } = require('../controllers/colis')
const router = express.Router()

router.get('/colis', all_colis)
router.post('/colis', add_colis)
router.delete('/colis/:id', delete_colis)
router.put('/colis/:id', update_colis)

router.get('/colis/:id', one_colis)

module.exports = router
