
const express = require('express')
const connect_mongodb = require('./lib/connect_db')
const app = express()

const port = 3000

app.use(express.json())


// Calling router
const router_agence = require('./routers/agence')
const router_pays = require('./routers/pays')
const router_ville = require('./routers/ville')
const router_user = require('./routers/user')

// Using router
app.use('/api',router_agence)
app.use('/api',router_pays)
app.use('/api',router_ville)
app.use('/api',router_user)

app.listen(port, console.log('Console running on '+port+' port'))
