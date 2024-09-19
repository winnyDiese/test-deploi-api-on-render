
const express = require('express')
const { 
    all_user, 
    add_agent_sendango, 
    get_agents_sendango, 
    add_user, 
    one_user, 
    login, 
    logout, 
    delete_user,
    update_user,
    one_user_by_tel,
    one_user_by_type_user,
    one_user_by_status,
    get_beneficiaire,
    get_client,
    get_agent_agence,
} = require('../controllers/user')

const router = express.Router()


router.get('/user', all_user)
router.get('/agent-agence', get_agent_agence)
router.get('/agent-sendango', get_agents_sendango)
router.get('/client', get_client)
router.get('/beneficiaire', get_beneficiaire)
router.post('/user', add_user)
router.post('/new-agent-sendango', add_agent_sendango)
router.delete('/user/:id', delete_user)
router.put('/user/:id', update_user)

router.get('/user/:id', one_user)
router.get('/user/tel/:tel', one_user_by_tel)
router.get('/user/type/:type', one_user_by_type_user)
router.get('/user/status/:status', one_user_by_status)

// Login
router.post('/user/login', login)
router.post('/user/logout', logout)

module.exports = router   
