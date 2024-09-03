
const express = require('express')
const {all_use_exten, add_use_exten,one_use_exten,delete_use_exten,update_use_exten,use_exten_byuser,use_exten_byextension,get_users_by_extension} = require('../controllers/user-extension')
const router = express.Router()


router.get('/user-extension', all_use_exten)
router.post('/user-extension', add_use_exten)
router.delete('/user-extension/:id', delete_use_exten)
router.put('/user-extension/:id', update_use_exten)

router.get('/user-extension/:id', one_use_exten)
router.get('/user-extension/user/:id', use_exten_byuser)
router.get('/user-extension/extension/:id', use_exten_byextension)

module.exports = router
