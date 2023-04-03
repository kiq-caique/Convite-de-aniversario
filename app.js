const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + "/publi c"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

let confirmados = [];

app.get("/", (req, res) => {
  res.render("index.ejs", { confirmados: confirmados });
});

app.get("/public", function (req, res) {
  res.set("Content-Type", "image/jpeg");
  res.sendFile(__dirname + "/imagem.jpg");
});

app.post("/confirmar", (req, res) => {
  const nome = req.body.nome;
  const email = req.body.email;
  const telefone = req.body.telefone;
  const precisaCarona = req.body.carona;

  if (confirmaPresenca(nome, email, telefone, precisaCarona)) {
    res.redirect("/?confirmado=true");
  } else {
    res.redirect("/?erro=true");
  }
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}.`);
});

function confirmaPresenca(nome, email, telefone, precisaCarona) {
  // Por enquanto, apenas armazena os dados na variável confirmados... mas podemos tentar enviar por email
  // ou outra coisa que me passe a lista inteira? a lista deve ficar visível a todas as pessoas
  // Preciso ver depois como eu deletaria dados repetidos...
  const novoConfirmado = {
    nome: nome,
    email: email,
    telefone: telefone,
    precisaCarona: precisaCarona ? "Sim" : "Não",
  };
  confirmados.push(novoConfirmado);
  console.log(confirmados);
  return true;
}
