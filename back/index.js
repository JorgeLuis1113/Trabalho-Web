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

// Verificação do token
function verificaToken(req, res, next) {
    const authHeaders = req.headers['authorization'];

    // Bearer token
    const token = authHeaders && authHeaders.split(' ')[1];
    console.log(token);
    
    if(token == null) {
        return res.status(401).send('Acesso negado');
    }

    jwt.verify(token, process.env.TOKEN, (err) => {
        if(err) {
            return res.status(403).send('Token inválido/expirado');
        }
    });
}