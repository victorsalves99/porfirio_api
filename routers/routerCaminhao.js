const routerCaminhao = require("express").Router();
const CaminhaoController = require("../controllers/camilhaoController");
const autenticacaoRotas = require("../helpers/autenticacaoRotas.js");

const upload = require("../config/multer.js");

routerCaminhao.get("/", CaminhaoController.pegarTodosCaminhoes);
routerCaminhao.get("/:id", CaminhaoController.pegarCaminhaoPorId);
routerCaminhao.post(
  "/",
  upload.array("files"),
  autenticacaoRotas,
  CaminhaoController.criarCamihao
);
routerCaminhao.delete("/:id",autenticacaoRotas,CaminhaoController.deletarCaminhao)

module.exports = routerCaminhao;
