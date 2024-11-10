const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    pass:{
        type:String,
        required:true,
        unique:true,
    },
    where:{
        type:String,
        required:true,
        unique:true,
    },
})

const User = mongoose.model("User",userSchema)

module.exports = {User}