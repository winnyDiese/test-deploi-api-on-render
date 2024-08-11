
const express = require('express')
const {all_status, add_status, delete_status, update_status, one_status} = require('../controllers/status')
const router = express.Router()


router.get('/status', all_status)
router.post('/status', add_status)
router.delete('/status/:id', delete_status)
router.put('/status/:id', update_status)

router.get('/status/:id', one_status)

module.exports = router
