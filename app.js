
const express = require('express')
const connect_mongodb = require('./lib/connect_db')
const agence = require('./routers/agence')
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

app.use('/agence',agence)

app.listen(port, console.log('Console running on '+port+' port'))