const Usuario = require("../models/usuarioModel");
const verificadorDeDados = require("../helpers/verificardorDeDados");
const apagarImagem = require("../helpers/apagarImagem");
const gerarToken = require("../helpers/gerarToken");
const bcrypt = require("bcrypt");
const fs = require("fs");

module.exports = class UsuarioController {
  static async criarUsuario(req, res) {
    try {
      const { nome, usuario, senha, nivel } = req.body;
      const imagem = req.file.path;

      verificadorDeDados(nome, req, res);
      verificadorDeDados(usuario, req, res);
      verificadorDeDados(senha, req, res);
      verificadorDeDados(nivel, req, res);
      verificadorDeDados(imagem, req, res);
      if (!req.file.originalname.match(/\.(png|jpeg|jpg)$/)) {
        // upload only png and jpg format
        apagarImagem(req);
        res.status(422).json({ msg: "Por favor, envie apenas png ou jpg!" });
        return;
      }
      if (req.file.size > 200000) {
        apagarImagem(req);
        res
          .status(422)
          .json({ msg: "Por favor, envie um arquivo com ate 2mb" });
        return;
      }

      const user = await Usuario.findOne({ usuario: usuario });
      if (user) {
        apagarImagem(req);
        res
          .status(422)
          .json({ msg: "Este usuario já existe por favor tente outro!" });
        return;
      }

      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(senha, salt);

      const newUser = await new Usuario({
        nome,
        usuario,
        nivel,
        senha: passwordHash,
        perfil: imagem,
      });

      await newUser.save();

      res.status(201).json({ msg: "Usuario criado com sucesso!" });
    } catch (error) {
      apagarImagem(req);
      res
        .status(500)
        .json({ msg: "Erro no servidor, Tente novamente mais tarde!" });
    }
  }

  static async pegarTodosUsuarios(req, res) {
    try {
      const usuarios = await Usuario.find();
      res.status(200).json(usuarios);
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Erro no servidor, Tente novamente mais tarde!" });
    }
  }

  static async pegarUsuarioPorId(req, res) {
    const { id } = req.params;
    try {
      const usuario = await Usuario.findById(id);
      res.status(200).json(usuario);
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Erro do servidor, tente novamente mais tarde!" });
    }
  }

  static async editarUsuario(req, res) {
    const { nome, senha, nivel } = req.body;
    const { id } = req.params;
    const imagem = req.file.path;

    verificadorDeDados(nome, req, res);
    verificadorDeDados(senha, req, res);
    verificadorDeDados(nivel, req, res);
    verificadorDeDados(imagem, req, res);
    if (!req.file.originalname.match(/\.(png|jpeg|jpg)$/)) {
      // upload only png and jpg format
      apagarImagem(req);
      res.status(422).json({ msg: "Por favor, envie apenas png ou jpg!" });
      return;
    }
    if (req.file.size > 20000) {
      apagarImagem(req);
      res.status(422).json({ msg: "Por favor, envie um arquivo com ate 2mb" });
      return;
    }

    try {
      const user = await Usuario.findById(id);
      if (!user) {
        apagarImagem(req);
        res.status(422).json({ msg: "Usuario não encontrado!" });
        return;
      }

      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(senha, salt);

      user.nome = nome;
      user.nivel = nivel;
      user.perfil = imagem;
      user.senha = passwordHash;

      await user.save();

      res.status(201).json({ msg: "Usuario atualizado com sucesso!" });
    } catch (error) {
      apagarImagem(req);
      res
        .status(500)
        .json({ msg: "Erro no servidor, Tente novamente mais tarde!" });
    }
  }

  static async deletarUsuario(req, res) {
    const { id } = req.params;

    try {
      const user = await Usuario.findById(id);
      if (!user) {
        res.status(442).json({ msg: "Erro ao apagar usuário" });
        return;
      }
      fs.unlinkSync(user.perfil);
      await user.deleteOne();
      res.status(200).json({ msg: "Usuario deletado com sucesso!" });
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Erro no servidor, Tente novamente mais tarde!" });
    }
  }

  static async login(req, res) {
    try {
      const { usuario, senha } = req.body;
      verificadorDeDados(usuario, req, res);
      verificadorDeDados(senha, req, res);
      const user = await Usuario.findOne({ usuario: usuario });
      if (!user) {
        res.status(404).json({ msg: "Usuario não encontrado" });
        return;
      }

      const checarSenha = await bcrypt.compare(senha, user.senha);
      if (!checarSenha) {
        res.status(422).json({ msg: "Senha invalida" });
        return;
      }
      const token = await gerarToken(user);
      console.log(token);
      if (!token) {
        res.status(201).json({ msg: "token não gerado!" });
        return;
      }
      res.status(201).json({ msg: "autorizado", token });
    } catch (error) {
      console.error(error);
    }
  }

  static async autenticacao(req,res){
    const user = req.user
    res.status(200).json(user)
  }
};
