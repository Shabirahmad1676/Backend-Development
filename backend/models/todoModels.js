const mongoose = require('mongoose')

const todoSchema = mongoose.Schema(
    {
        title: {
            type:String,
            trim:true,
            maxlength:100,
            required:false
        },
        completed: {
            type:Boolean,
            default:false
        }
    },{timestamps:true}
)



module.exports = mongoose.model('Todo',todoSchema)