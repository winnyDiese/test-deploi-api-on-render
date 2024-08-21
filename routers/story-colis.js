
const express = require('express')
const { all_story_colis, add_story_colis, delete_story_colis, update_story_colis, one_story_colis,story_colis_bycolis,story_colis_bystatus } = require('../controllers/story-colis')
const router = express.Router()


router.get('/historique-colis', all_story_colis)
router.post('/historique-colis', add_story_colis)
router.delete('/historique-colis/:id', delete_story_colis)
router.put('/historique-colis/:id', update_story_colis)

router.get('/historique-colis/:id', one_story_colis)
router.get('/historique-colis/colis/:id', story_colis_bycolis)
router.get('/historique-colis/status/:id', story_colis_bystatus)

module.exports = router
