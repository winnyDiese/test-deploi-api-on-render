
const express = require('express')
const { all_tarif, add_tarif,one_tarif,delete_tarif } = require('../controllers/tarif')
const router = express.Router()


router.get('/tarif', all_tarif)
router.post('/tarif', add_tarif)
router.get('/tarif/:id', one_tarif)
router.delete('/tarif/:id', delete_tarif)

module.exports = router
