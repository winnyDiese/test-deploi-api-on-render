
const express = require('express')
const { all_destination, add_destination,delete_destination,update_destination,one_destination } = require('../controllers/destination')
const router = express.Router()


router.get('/destination', all_destination)
router.post('/destination', add_destination)
router.delete('/destination/:id', delete_destination)
router.put('/destination/:id', update_destination)

router.get('/destination/:id', one_destination)

module.exports = router
