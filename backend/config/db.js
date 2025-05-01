const mongoose = require('mongoose')

const connectDB = async ()=>{
    try {
        await mongoose.connect('mongodb+srv://scienctistshabir:shabir123@cluster0.ijikhut.mongodb.net/mernApp',{
            useNewUrlParser: true,
        useUnifiedTopology: true,
        })
        console.log("Connected DB💪")
    } catch (error) {
        console.log(err.message)
        process.exit(1)
    }
}


module.exports = connectDB