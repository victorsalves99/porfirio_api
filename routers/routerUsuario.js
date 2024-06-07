const routerUsuario = require("express").Router();
const UserController = require("../controllers/usuarioController.js");
const autenticacaoRotas = require("../helpers/autenticacaoRotas.js");

const upload = require("../config/multer.js");

routerUsuario.get("/", autenticacaoRotas, UserController.pegarTodosUsuarios);
routerUsuario.get("/autenticacao", autenticacaoRotas, UserController.autenticacao);
routerUsuario.get("/:id", autenticacaoRotas, UserController.pegarUsuarioPorId);
routerUsuario.post("/login", UserController.login);
routerUsuario.patch(
  "/edit/:id",
  autenticacaoRotas,
  upload.single("file"),
  UserController.editarUsuario
);
routerUsuario.post(
  "/",
  autenticacaoRotas,
  upload.single("file"),
  UserController.criarUsuario
);
routerUsuario.delete("/:id", autenticacaoRotas, UserController.deletarUsuario);

module.exports = routerUsuario;
