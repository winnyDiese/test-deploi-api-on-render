
const express = require('express')
const {all_compte, add_compte, delete_compte, update_compte, one_compte} = require('../controllers/compte')
const router = express.Router()


router.get('/compte', all_compte)
router.post('/compte', add_compte)
router.delete('/compte/:id', delete_compte)
router.put('/compte/:id', update_compte)

router.get('/compte/:id', one_compte)

module.exports = router
