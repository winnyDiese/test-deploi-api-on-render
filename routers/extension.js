
const express = require('express')
const {all_extension, add_extension,delete_extension,update_extension,one_extension,one_extension_by_agence,one_extension_by_ville,get_active_extensions_by_agence,get_inactive_extensions_by_agence} = require('../controllers/extension')
const router = express.Router()


router.get('/extension', all_extension)
router.post('/extension', add_extension)
router.delete('/extension/:id', delete_extension)
router.put('/extension/:id', update_extension)

router.get('/extension/byAgence/active/:id', get_active_extensions_by_agence)
router.get('/extension/byAgence/desactive/:id', get_inactive_extensions_by_agence)
router.get('/extension/agence/:id', one_extension_by_agence)
router.get('/extension/ville/:id', one_extension_by_ville)
router.get('/extension/:id', one_extension)

module.exports = router
