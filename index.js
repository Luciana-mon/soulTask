require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

//Cong=figuração do App
const app = express();
app.use(express.json());

//Configuração do Banco de dados
mongoose.connect(process.env.MONGODB_URL);

//rotas
const tarefasRoutes = require("./routes/tarefas");
app.use(tarefasRoutes);




//Escuta de eventos
app.listen(3000, () => {
    console.log("Servidor rodando em: http://localhost:3000/");
});


