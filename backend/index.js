const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const todoRoutes = require('./routes/todoRoutes');
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/authRoutes')
require('dotenv').config();
const app = express();
const port = 5000;

connectDB();

app.use(cookieParser())
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/todos', todoRoutes);
app.use('/api/auth',authRoutes)
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
