
const express = require('express')
const { all_user, add_agent_sendango, get_agents_sendango, add_user, one_user, user_login, delete_user, update_user, one_user_by_tel, one_user_by_type_user, one_user_by_status } = require('../controllers/user')
const router = express.Router()


router.get('/user', all_user)
router.get('/agent-sendango', get_agents_sendango)
router.post('/user', add_user)
router.post('/new-agent-sendango', add_agent_sendango)
router.delete('/user/:id', delete_user)
router.put('/user/:id', update_user)

router.get('/user/:id', one_user)
router.get('/user/tel/:tel', one_user_by_tel)
router.get('/user/type/:type', one_user_by_type_user)
router.get('/user/status/:status', one_user_by_status)

// Login
router.post('/user/login', user_login)

module.exports = router   
