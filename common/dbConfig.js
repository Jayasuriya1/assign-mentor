const mongoose = require('mongoose')
//Connecting MongoDB Using Mongoose 
module.exports ={
    async mongooseConnection(){
    try {
        const connection = await mongoose.connect(process.env.MONGODB_CONNECTION_URL)
        console.log("MongoDb Connected Successfully")
    } catch (error) {
        console.log(error)
    }
}
}