
const express = require('express')
const { all_agence, add_agence, delete_agence, update_agence, one_agence,get_active_agences,get_inactive_agences } = require('../controllers/agence')
const router = express.Router()


router.get('/agence', all_agence)
router.post('/agence', add_agence)
router.delete('/agence/:id', delete_agence)
router.put('/agence/:id', update_agence)

router.get('/agence/active', get_active_agences)
router.get('/agence/desactive', get_inactive_agences)
router.get('/agence/:id', one_agence)

module.exports = router

