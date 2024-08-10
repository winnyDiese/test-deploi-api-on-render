
const express = require('express')
const {all_extension, add_extension,delete_extension,update_extension,one_extension} = require('../controllers/extension')
const router = express.Router()


router.get('/extension', all_extension)
router.post('/extension', add_extension)
router.delete('/extension/:id', delete_extension)
router.put('/extension/:id', update_extension)

router.get('/extension/:id', one_extension)

module.exports = router
