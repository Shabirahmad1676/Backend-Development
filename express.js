
//Express is NPM Package
//It is Framwork
//Manages everything like sending and receving and send them response


const express = require('express')
const app = express()


//Routing 
app.get("/",function(req,res){
  res.send("Hi, Shabir")
})
app.get("/my",function(req,res){
  res.send("Hi, Developers")
})


//Middleware ==> before routing , for example if we w=are requesting to facebook server for image so it goes to router and then 
// response but we make some change before request enter to server which is done by Middlewre

app.listen(3000)