
const express = require('express')
const{all_using, add_using, delete_using, update_using, one_using} = require('../controllers/utilisation')
const router = express.Router()


router.get('/utilisation', all_using)
router.post('/utilisation', add_using)
router.delete('/utilisation/:id', delete_using)
router.put('/utilisation/:id', update_using)

router.get('/utilisation/:id', one_using)

module.exports = router
