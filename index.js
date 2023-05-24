const express = require("express")
const MongoDb = require("./common/dbConfig")
const mentor = require('./Routes/mentor')
const student = require('./Routes/student')
const mongoose = require('mongoose')
const { json } = require("express")
require('dotenv').config()
const PORT = process.env.PORT

const app = express()
MongoDb.mongooseConnection()
app.use(express.json())
app.use('/mentor',mentor)
app.use('/student',student)
app.get("/",(req,res)=>{
    res.status(200).send("Iam Jayasuriya")
})

app.listen(PORT,()=>console.log(`App is running on ${PORT} Port`))