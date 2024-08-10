
const express = require('express')
const {all_agence_desti, add_agence_desti,delete_agence_desti,update_agence_desti,one_agence_desti} = require('../controllers/agence-destination')
const router = express.Router()


router.get('/agence', all_agence_desti)
router.post('/agence', add_agence_desti)
router.delete('/agence/:id', delete_agence_desti)
router.put('/agence/:id', update_agence_desti)

router.get('/agence/:id', one_agence_desti)

module.exports = router
