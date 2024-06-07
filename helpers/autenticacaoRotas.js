const pegarUsuarioPeloToken = require("./pegarUsuarioPeloToken");

module.exports = async function autenticacaoRotas(req, res, next) {
  const usuario = await pegarUsuarioPeloToken(req, res);
  if(!usuario){
    res.status(401).json({ msg: "Token invalido" });
    return
  }
  req.user = usuario;
  next();
};
