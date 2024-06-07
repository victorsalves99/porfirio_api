const mongoose = require("../config/conexao")

const Schema = mongoose.Schema



const Usuario = mongoose.model("Usuario",new Schema({
    nome:{
        type:String,
        require:true,
    },
    usuario:{
        type:String,
        require:true,
    },
    senha:{
        type:String,
        require:true,
    },
    perfil:{
        type:String,
    },
    nivel:{
        type:String,
        require:true,
    }
},{timestamps:true}))


module.exports = Usuario