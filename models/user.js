// Schema file making DB columns

const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({

    username:{
        type:String,
        required:true,
        unique:true
        
    }, 

    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    // role:{
    //     type:String,
    //     default:"user",
    //     enum:["admin","writer","user"]
    // },


},

{timestamps:true}

);

// Exporting user schema to use in routing file and defining table name User
module.exports= mongoose.model("User", UserSchema);