
const express = require('express')
const app = express()

const port = 3000

app.use(express.json())


// Calling router
const router_agence = require('./routers/agence')
const router_pays = require('./routers/pays')
const router_ville = require('./routers/ville')
const router_user = require('./routers/user')
const router_type = require('./routers/type-user')
const router_destination = require('./routers/destination')
const router_agence_desti = require('./routers/agence-destination')
const router_tarif = require('./routers/tarif')
const router_compte = require('./routers/compte')

// Using router
app.use('/api',router_agence)
app.use('/api',router_pays)
app.use('/api',router_user)
app.use('/api',router_ville)
app.use('/api',router_type)
app.use('/api',router_destination)
app.use('/api',router_agence_desti)
app.use('/api',router_tarif)
app.use('/api',router_compte)

app.listen(port, console.log('Console running on '+port+' port'))
