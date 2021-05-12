const { Publicacao, Foto, Usuario } = require("../models");

const fs = require("fs");

const postController = {
  index: async (_req, res) => {
    const publicacoes = await Publicacao.findAll({
      include: [
        {
          model: Foto,
          required: true,
        },
        {
          model: Usuario,
          required: true,
        },
      ],
      order: [["created_at", "DESC"]],
    });

    const publicacoesFormatadas = publicacoes.map((publicacao) => {
      const data = new Date(publicacao.created_at);
      const dataformatada = new Intl.DateTimeFormat("pt-BR", {
        dateStyle: "short",
        timeStyle: "short",
      }).format(data);

      return { ...publicacao, created_at: dataformatada };
    });

    return res.render("index", { publicacoes: publicacoesFormatadas });
  },
  create: (req, res) => {
    res.render("post");
  },

  store: async (req, res) => {
    const { file } = req;
    const { user } = req.session;

    const dataAtual = new Date();

    const publicacao = await Publicacao.create({
      usuario_id: user.id,
      created_at: dataAtual,
      legenda: "Uma foto qualquer",
    });

    if (!publicacao) {
      return res.send("Erro ao tentar criar publicacao");
    }

    const foto = await Foto.create({
      imagem: file.filename,
      id_publicacao: publicacao.id,
    });

    if (!foto) {
      fs.unlinkSync(file.path);
      return res.send("Erro ao tentar salvar foto");
    }

    return res.redirect("/home");
  },
};

module.exports = postController;
