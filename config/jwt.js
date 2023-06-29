const jwt = require("jsonwebtoken");
require('dotenv').config;

//sends a signed jwt token 
const signJswtToken=(data)=>{

    let JWT_EXPIRATION_TIME=60*5;


    let jwtSecret=process.env.JWT_SECTET;
    let token =jwt.sign(data, jwtSecret , {expiresIn:JWT_EXPIRATION_TIME});
    return token;
}
module.exports=signJswtToken;