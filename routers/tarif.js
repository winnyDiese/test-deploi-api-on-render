
const express = require('express')
const { all_tarif, add_tarif,one_tarif,delete_tarif,update_tarif,all_tarif_by_agence } = require('../controllers/tarif')
const router = express.Router()


router.get('/tarif', all_tarif)
router.post('/tarif', add_tarif)
router.delete('/tarif/:id', delete_tarif)
router.put('/tarif/:id', update_tarif)

router.get('/tarif/agence/:id_agence', all_tarif_by_agence)
router.get('/tarif/:id', one_tarif)

module.exports = router
