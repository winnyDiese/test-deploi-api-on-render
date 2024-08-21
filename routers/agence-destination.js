
const express = require('express')
const {all_agence_desti, add_agence_desti,delete_agence_desti,update_agence_desti,one_agence_desti,one_agence_desti_by_status,one_agence_desti_by_desti} = require('../controllers/agence-destination')
const router = express.Router()


router.get('/agence-destination', all_agence_desti)
router.post('/agence-destination', add_agence_desti)
router.delete('/agence-destination/:id', delete_agence_desti)
router.put('/agence-destination/:id', update_agence_desti)

router.get('/agence-destination/:id', one_agence_desti)
router.get('/agence-destination/status/:status', one_agence_desti_by_status)
router.get('/agence-destination/destination/:destination', one_agence_desti_by_desti)

module.exports = router
