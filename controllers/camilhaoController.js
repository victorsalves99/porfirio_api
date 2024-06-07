const Caminhao = require("../models/caminhaoModel");
const verificadorDeDados = require("../helpers/verificardorDeDados");
const fs = require("fs");
const apagarImagem = require("../helpers/apagarImagem");
module.exports = class CaminhaoController {
  static async criarCamihao(req, res) {
    const { nome, preco, marca, descricao } = req.body;
    verificadorDeDados(nome, req, res);
    verificadorDeDados(preco, req, res);
    verificadorDeDados(marca, req, res);
    verificadorDeDados(descricao, req, res);
    const listaDeFotos = [];
    req.files.map((item) => {
      if (!item.originalname.match(/\.(png|jpeg|jpg)$/)) {
        // upload only png and jpg format
        apagarImagem(req);
        res.status(422).json({ msg: "Por favor, envie apenas png ou jpg!" });
        return;
      }
      if (item.size > 2000000) {
        apagarImagem(req);
        res
          .status(422)
          .json({ msg: "Por favor, envie um arquivo com ate 2mb" });
        return;
      }
      const url = {
        url: item.path,
      };
      listaDeFotos.push(url);
    });

    try {
      const caminhao = await new Caminhao({
        nome,
        preco,
        marca,
        descricao,
        fotos: listaDeFotos,
      });
      await caminhao.save();
      res.status(201).json({ msg: "Caminhão criado com sucesso!" });
    } catch (error) {
      res.status(500).json({ msg: "Erro ao criar Caminhão!" });
    }
  }

  static async pegarTodosCaminhoes(req, res) {
    try {
      const caminhoes = await Caminhao.find();
      if (!caminhoes) {
        res.status(404).json({ msg: "Não existe caminhão cadastrado!" });
      }
      res.status(200).json(caminhoes);
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Erro de servidor! tente novamente mais tarde" });
    }
  }

  static async pegarCaminhaoPorId(req, res) {
    try {
      const { id } = req.params;
      verificadorDeDados(id, req, res);
      const caminhao = await Caminhao.findById(id);
      if (!caminhao) {
        res.status(404).json({ msg: "Caminhão não encontrado!" });
        return;
      }
      res.status(200).json(caminhao);
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Error Servidor tente novamente mais tarde!" });
    }
  }

  static async deletarCaminhao(req, res) {
    try {
      const { id } = req.params;
      verificadorDeDados(id, req, res);
      const caminhao = await Caminhao.findById(id);
      if (!caminhao) {
        res.status(404).json({ msg: "Caminhão não encontrado!" });
        return;
      }
      caminhao.fotos.map((item) => {
        fs.unlinkSync(item.url);
      });
      await caminhao.deleteOne();
      res.status(200).json({msg:"Caminhão deletado com sucesso!"});
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Error Servidor tente novamente mais tarde!" });
    }
  }
};
