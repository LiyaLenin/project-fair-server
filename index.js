//Loads .env file contents into process .env by default

require('dotenv').config()
//server creation

const express =require('express')
const cors=require('cors')
const router=require('./Routes/routes')
const pfServer=express()
require('./DB/connection')

pfServer.use(cors())
pfServer.use(express.json())
pfServer.use(router)
pfServer.use('/uploads',express.static('./uploads'))

const PORT=3000 || process.env.PORT
pfServer.listen(PORT,()=>{
    console.log(`project server started at port: ${PORT}`);
})
pfServer.get('/',(req,res)=>{
    res.status(200).send("<h1 style=color:red;> Project fair server started!!! Waiting for client Request </h1>")
})