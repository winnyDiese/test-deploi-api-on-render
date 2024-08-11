
const express = require('express')
const { all_notification, add_notification, delete_notification, update_notification, one_notification } = require('../controllers/notification')
const router = express.Router()


router.get('/notification', all_notification)
router.post('/notification', add_notification)
router.delete('/notification/:id', delete_notification)
router.put('/notification/:id', update_notification)

router.get('/notification/:id', one_notification)

module.exports = router
