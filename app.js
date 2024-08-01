
const express = require('express')
const connect_mongodb = require('./lib/connect_db')
const app = express()

const port = 3000


const routerAgence = require('./routers/agence')
app.use('/api/agence',routerAgence)

app.listen(port, console.log('Console running on '+port+' port'))

