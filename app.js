
const express = require('express')
const app = express()

const port = 3000

const router = express.Router()
router.get('/',(req,res)=>{
    res.json({
        "Pascal-message":"Salut Boss...",
        "Pascal-message-2":"Armel ton api est deja en ligne..."
    })
})

app.use('/api/',router)

app.listen(port, console.log('Console running on '+port+' port'))