const jwt = require("jsonwebtoken")
require("dotenv").config()
const secret = process.env.SECRET

module.exports =  function gerarToken(user,req,res) {

    const token =  jwt.sign({
        id: user._id,

    },secret) 
    
    return token
}