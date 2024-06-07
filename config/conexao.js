const mongoose = require("mongoose");
require("dotenv").config();

const dbUsuario = process.env.DBUSUARIO;
const dbSenha = process.env.DBSENHA;

const main = async () => {
  await mongoose
    .connect(
      `mongodb+srv://${dbUsuario}:${dbSenha}@cluster0.hcsor8s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster`
    )
    .then(() => {
      console.log("Conectou!");
    })
    .catch(() => {
      console.log("Erro ao conectar!");
    });
};
main();

module.exports = mongoose;
