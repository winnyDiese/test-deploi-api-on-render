
const express = require('express')
const app = express()
const cors = require('cors');

const port = 3000

app.use(express.json())

app.use(cors());

app.use(cors({
  origin: 'http://localhost:3000', 
}));



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
const router_utilisation = require('./routers/utilisation')
const router_extension = require('./routers/extension')
const router_colis = require('./routers/colis')
const router_user_exten = require('./routers/user-extension')
const router_status = require('./routers/status')
const router_notif = require('./routers/notification')
const router_story_colis = require('./routers/story-colis')

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
app.use('/api',router_utilisation)
app.use('/api',router_extension)
app.use('/api',router_colis)
app.use('/api',router_user_exten)
app.use('/api',router_status)
app.use('/api',router_notif)
app.use('/api',router_story_colis)


app.listen(port, console.log('Console running on '+port+' port'))
