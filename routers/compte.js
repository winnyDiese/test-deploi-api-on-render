
const express = require('express')
const {all_compte, add_compte, delete_compte, update_compte, one_compte, get_comptes_by_agence,update_and_add_montant_compte_by_agence} = require('../controllers/compte')
const router = express.Router()


router.get('/compte', all_compte)
router.post('/compte', add_compte)
router.delete('/compte/:id', delete_compte)
router.put('/compte/:id', update_compte)

router.put('/compte/additional/:id_agence', update_and_add_montant_compte_by_agence)
router.get('/compte/:id', one_compte)
router.get('/compte/agence/:id_agence', get_comptes_by_agence)

module.exports = router
