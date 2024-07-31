
const express = require('express')
const app = express()

const port = 3000

const router = express.Router()
router.get('/',(req,res)=>{
    res.json({
        "hello":"hi"
    })
})

app.use('/api/',router)

app.listen(port, console.log('Console running on '+port+' port'))