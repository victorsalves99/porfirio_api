const User = require("../models/usuarioModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async function pegarUsuarioPeloToken(req, res) {
  const authHeader = req.headers["authorization"];
  console.log(req)
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return false;

  try {
    const idUsuario = await jwt.verify(token, process.env.SECRET);
    const user = await User.findById(idUsuario.id);
    if (!user) {
      return;
    }
    return user;
  } catch (error) {
    return false;
  }
};
