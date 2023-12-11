require("dotenv").config();
const express = require('express');
const fs = require('fs');
const cors = require("cors");
const path = require("path");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

// Criando instância de express
const app = express();

// Extrair dados de forms com requisição post
app.use(express.json());
app.use(cors());

app.listen(3000, () => {
    console.log('Servidor na porta 3000');
});

// Importando classes
const User = require('./model/User');
const Inscricao = require('./model/Inscricao');
