const fs = require("fs")

module.exports = function verificadorDeDados(valor,req, res) {

  if (!valor) {
    res
      .status(422)
      .json({ msg: "Erro! Verifique os dados e tente novamente!" });
    
      throw "Erro2";
  }
};
