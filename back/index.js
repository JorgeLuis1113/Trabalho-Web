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

// Autenticação do usuário
app.post('/login', async (req, res) => {

    // Extração dos dados do formulário
    const {email, senha} = req.body;

    // Abertura do arquivo de usuários
    const jsonPath = path.join(__dirname, '.', 'db', 'banco-dados-usuario.json');
    const usuariosBD = JSON.parse(fs.readFileSync(jsonPath, {encoding: 'utf8', flag: 'r'}))

    // Teste de usuário no banco de dados
    for(let user of usuariosBD) {
        if(user.email === email) {
            const senhaValida = await bcrypt.compare(senha, user.password);
            
            if(senhaValida) {
                const token = jwt.sign(user, process.env.TOKEN);
                return res.json({'token' : token});
            }
            else {
                return res.status(402).send('Usuário ou senha incorretos');
            }
        }
    }
    // Não existe usuário com o email
    return res.status(409).send(`Usuário com ${email} não existe. Considere criar uma conta!`);
});

// Verificação do token
function verificaToken(req, res, next) {
    const authHeaders = req.headers['authorization'];

    // Bearer token
    const token = authHeaders && authHeaders.split(' ')[1];
    
    if(token == null) {
        return res.status(401).send('Acesso negado');
    }

    jwt.verify(token, process.env.TOKEN, (err) => {
        if(err) {
            return res.status(403).send('Token inválido/expirado');
        }
    });
}