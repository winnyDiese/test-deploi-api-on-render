
const express = require('express')
const { all_story_colis, add_story_colis, delete_story_colis, update_story_colis, one_story_colis } = require('../controllers/story-colis')
const router = express.Router()


router.get('/historique-colis', all_story_colis)
router.post('/historique-colis', add_story_colis)
router.delete('/historique-colis/:id', delete_story_colis)
router.put('/historique-colis/:id', update_story_colis)

router.get('/historique-colis/:id', one_story_colis)

module.exports = router
