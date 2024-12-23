
//Express is NPM Package
//It is Framwork
//Manages everything like sending and receving and send them response


const express = require('express')
const app = express()

//these two are used for making blob(unreadble format) to readbl form 
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//Middleware ==> before move to any route first goes here
// here it takes a callback ftn with three parametrs ike req, res, next
app.use(function(req,res,next){
  console.log('Middleware Activated!')
  next();
});

//Routing 
app.get("/",function(req,res){
  res.send("Hi, Shabir")
})
app.get("/my",function(req,res){
  res.send("Hi, Developers")
})

//error handling
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something Went Wrong!');
});

//Middleware ==> before routing , for example if we w=are requesting to facebook server for image so it goes to router and then 
// response but we make some change before request enter to server which is done by Middlewre

app.listen(3000)