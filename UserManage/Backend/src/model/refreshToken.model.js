const mongoose = require("mongoose");
const{Schema,model}=mongoose;

const refreshTokenSchema=new Schema({
    email:{type:String,unique:true},
    refreshToken:{type:String,unique:true},
});

const RefreshToken=model('RefreshToken',refreshTokenSchema);

module.exports=RefreshToken;