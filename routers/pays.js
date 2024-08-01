
const express = require('express')
const { all_pays, add_pays } = require('../controllers/pays')
const router = express.Router()


router.get('/pays', all_pays)
router.post('/pays', add_pays)

module.exports = router
