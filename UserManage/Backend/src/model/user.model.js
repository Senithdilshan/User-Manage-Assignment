const mongoose = require('mongoose');
const{Schema,model}=mongoose;

const userSchema=new Schema({
    name:{type:String,required: true},
    email:{type: String, unique: true},
    password:{
        type:String,required: true,
        minlength:6
    },
});

const User=model('User',userSchema);

module.exports=User;