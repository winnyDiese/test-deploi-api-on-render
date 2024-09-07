
const express = require('express')
const { all_story_colis, add_story_colis, delete_story_colis, update_story_colis, one_story_colis } = require('../controllers/story-colis')
const router = express.Router()


router.get('/story-colis', all_story_colis)
router.post('/story-colis', add_story_colis)
router.delete('/story-colis/:id', delete_story_colis)
router.put('/story-colis/:id', update_story_colis)

router.get('/story-colis/:id', one_story_colis)

module.exports = router
