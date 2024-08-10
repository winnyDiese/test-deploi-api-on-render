
const express = require('express')
const {all_agence_desti, add_agence_desti,delete_agence_desti,update_agence_desti,one_agence_desti,one_agence_desti_by_status} = require('../controllers/agence-destination')
const router = express.Router()


router.get('/agence-desti', all_agence_desti)
router.post('/agence-desti', add_agence_desti)
router.delete('/agence-desti/:id', delete_agence_desti)
router.put('/agence-desti/:id', update_agence_desti)

router.get('/agence-desti/:id', one_agence_desti)
router.get('/agence-desti/status/:status', one_agence_desti_by_status)

module.exports = router
