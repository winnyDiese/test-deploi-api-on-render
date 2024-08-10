
const express = require('express')
const { all_destination, add_destination,delete_destination,update_destination,one_destination } = require('../controllers/type-user')
const router = express.Router()


router.get('/type-user', all_destination)
router.post('/type-user', add_destination)
router.delete('/type-user/:id', delete_destination)
router.put('/type-user/:id', update_destination)

router.get('/type-user/:id', one_destination)

module.exports = router
