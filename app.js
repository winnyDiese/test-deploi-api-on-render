
const express = require('express')
const connect_mongodb = require('./lib/connect_db')
const app = express()

const port = 3000

// const router = express.Router()

connect_mongodb()

// router.get('/',(req,res)=>{
//     res.json({
//         "Pascal-message":"Salut Boss...",
//         "Pascal-message-2":"Armel ton api est deja en ligne..."
//     })
// })

const routerAgence = require('./routers/agence')
app.use('/agence',routerAgence)

app.listen(port, console.log('Console running on '+port+' port'))