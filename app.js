const express=require('express');
const app=express();

const env=require('dotenv');
env.config();
const CONNECTDB = require('./config/config');
const Userrouter = require('./routers/user');
const postrouter = require('./routers/post');
const authrouter = require('./routers/authuser');
app.use('/user',Userrouter)
app.use('/post',postrouter)
app.use('/authuser',authrouter)

const port=process.env.HOST_VAL;

app.listen(port,()=>
{
    console.log(`server listening the port ${port}`);
})