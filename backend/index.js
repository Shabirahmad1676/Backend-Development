const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const todoRoutes = require('./routes/todoRoutes');
const cookieParser = require('cookie-parser')

const app = express();
const port = 5000;

connectDB();

app.use(cookieParser())
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/todos', todoRoutes);


app.get('/cookie',(req,res)=>{
  res.cookie('name','ZamaCookie' , {
    httpOnly:true,
    maxAge:1000 * 60 * 60
  })
  res.send('Cookie Set')
})
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
