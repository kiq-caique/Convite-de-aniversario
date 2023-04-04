require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient } = require('mongodb');

const uri = "mongodb://mongo:2WubHNFSK2LuX6aHSN9t@containers-us-west-203.railway.app:7201";

const client = new MongoClient(uri);
client.connect(async err => {
  client.close();
});
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  const confirmados = await client.db("caique").collection("convites").find().toArray();
  res.render("index.ejs", { confirmados: confirmados });
});

app.get("/public", function (req, res) {
  res.set("Content-Type", "image/jpeg");
  res.sendFile(__dirname + "/imagem.jpg");
});

app.post("/confirmar", async (req, res) => {
  const nome = req.body.nome;
  const email = req.body.email;
  const telefone = req.body.telefone;
  const precisaCarona = req.body.carona;
  try {
    await confirmaPresenca(nome, email, telefone, precisaCarona);
    res.redirect("/?confirmado=true");
  } catch(e) {
    console.log(e);
    res.redirect("/?erro=true");
  }
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}.`);
});
async function confirmaPresenca(nome, email, telefone, precisaCarona) {
  // Por enquanto, apenas armazena os dados na variável confirmados... mas podemos tentar enviar por email
  // ou outra coisa que me passe a lista inteira? a lista deve ficar visível a todas as pessoas
  // Preciso ver depois como eu deletaria dados repetidos...
  const novoConfirmado = {
    nome: nome,
    email: email,
    telefone: telefone,
    precisaCarona: precisaCarona ? "Sim" : "Não",
  };
  await client.db("caique").collection("convites").insertOne(novoConfirmado);
  const confirmados = await client.db("caique").collection("convites").find().toArray();
  console.log(confirmados);
  return true;
}
