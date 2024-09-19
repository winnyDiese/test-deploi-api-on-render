
const express = require('express')
const { all_colis, add_colis,one_colis,delete_colis,update_colis,colis_bycode,colis_byuser_a,colis_byuser_b, update_colis_my_data, finish_update_colis, send_my_identity, colis_change_status } = require('../controllers/colis')
const router = express.Router()

router.get('/colis', all_colis)
router.post('/colis', add_colis)
router.delete('/colis/:id', delete_colis)

router.put('/colis/my-data/:id', update_colis_my_data)
router.put('/colis/send-my-identity/:id', send_my_identity)
router.put('/colis/finish-send/:id', finish_update_colis)
router.put('/colis/change-status/:id', colis_change_status)
router.put('/colis/:id', update_colis)

router.get('/colis/:id', one_colis)
router.get('/colis/code/:codeColis', colis_bycode)
router.get('/colis/user-a/:id', colis_byuser_a)
router.get('/colis/user-b/:id', colis_byuser_b)

module.exports = router
