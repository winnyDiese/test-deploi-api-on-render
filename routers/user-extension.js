
const express = require('express')
const {all_use_exten, add_use_exten,one_use_exten,delete_use_exten,update_use_exten} = require('../controllers/user-extension')
const router = express.Router()


router.get('/user-exten', all_use_exten)
router.post('/user-exten', add_use_exten)
router.delete('/user-exten/:id', delete_use_exten)
router.put('/user-exten/:id', update_use_exten)

router.get('/user-exten/:id', one_use_exten)

module.exports = router
