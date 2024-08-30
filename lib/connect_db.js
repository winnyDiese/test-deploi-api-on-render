
require('dotenv').config();

const mongoose = require('mongoose')


const connect_mongodb = async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL,{serverSelectionTimeoutMS: 30000 })
        console.log("Connected to mongodb") 
    }catch(error){
        console.log(error)
    }
}

// export default connectMongodb
module.exports = connect_mongodb
