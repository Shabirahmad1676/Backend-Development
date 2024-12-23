

// Setting express framework ans store in app variable
const express = require('express')
const app = express();

//Middlewear setUp

//Seeting Up Application config
app.set('view engine','ejs')

//It handles API data like JSON format
app.use(express.json())

//it handles URL encoded data
app.use(express.urlencoded({extended:true}))

//it allows EJS like static file i-e CSS HTML images, videos
app.use(express.static(Path.join(__dirname,"public")))

//Route example
app.get("/",function(req,res){
  res.send('Hello world')
})

//Server started
app.listen(3000)