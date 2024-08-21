
const express = require('express')
const { all_colis, add_colis,one_colis,delete_colis,update_colis,colis_bycode,colis_byuser_a,colis_byuser_b } = require('../controllers/colis')
const router = express.Router()

router.get('/colis', all_colis)
router.post('/colis', add_colis)
router.delete('/colis/:id', delete_colis)
router.put('/colis/:id', update_colis)

router.get('/colis/:id', one_colis)
router.get('/colis/code/:id', colis_bycode)
router.get('/colis/user-a/:id', colis_byuser_a)
router.get('/colis/user-b/:id', colis_byuser_b)

module.exports = router
