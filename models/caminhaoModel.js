const mongoose = require("../config/conexao")

const Schema = mongoose.Schema



const Usuario = mongoose.model("Caminhoes",new Schema({
    nome:{
        type:String,
        require:true,
    },
    preco:{
        type:String,
        require:true,
    },
    marca:{
        type:String,
        require:true,
    },
    fotos:{
        type:Array
    },
    descricao:{
        type:String,
        require:true,
    }
},{timestamps:true}))


module.exports = Usuario