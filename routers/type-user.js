
const express = require('express')
const { all_type, add_type,delete_type,update_type,one_type } = require('../controllers/type-user')
const router = express.Router()


router.get('/type-user', all_type)
router.post('/type-user', add_type)
router.delete('/type-user/:id', delete_type)
router.put('/type-user/:id', update_type)

router.get('/type-user/:id', one_type)

module.exports = router
