
const express = require('express')
const { all_pays, add_pays,one_contry,delete_contry, update_contry } = require('../controllers/pays')
const router = express.Router()


router.get('/pays', all_pays)
router.post('/pays', add_pays)
router.get('/pays/:id', one_contry)
router.delete('/pays/:id', delete_contry)
router.put('/pays/:id', update_contry)

module.exports = router
