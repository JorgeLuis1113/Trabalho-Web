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


// Rota de autenticação do usuário
app.post('/login', async (req, res) => {

    // Extração dos dados do formulário
    const {email, password} = req.body;

    // Abertura do arquivo de usuários
    const jsonPath = path.join(__dirname, '.', 'db', 'banco-dados-usuario.json');
    const usuariosBD = JSON.parse(fs.readFileSync(jsonPath, {encoding: 'utf8', flag: 'r'}));

    // Teste de usuário no banco de dados
    for(let user of usuariosBD) {
        if(user.email === email) {
            const senhaValida = await bcrypt.compare(password, user.password);
            
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


// Rota de cadastro de um usuario
app.post('/cadastro', async (req, res) => {

    // Extração dos dados do formulário
    const {username, email, password} = req.body;

    // Abertura do arquivo de usuarios
    const jsonPath = path.join(__dirname, '.', 'db', 'banco-dados-usuario.json');
    const usuariosBD = JSON.parse(fs.readFileSync(jsonPath, {encoding: 'utf8', flag: 'r'}))

    // Teste de email e username (devem ser únicos)
    for(let user of usuariosBD) {
        // Email e username em uso
        if(user.email === email && user.username === username) {
            return res.status(409).send('Email e username informados já estão em uso');
        }
        // Apenas email em uso
        if(user.email === email) {
            return res.status(409).send('O email informado já está em uso');
        }
        // Apenas username em uso
        if(user.username === username) {
            return res.status(409).send('O username informado já está em uso');
        }        
    }

    // Não existe usuário com email e username informados
    // Criar id incremental
    const id = usuariosBD.length + 1;

    // Criptografar a senha
    const salt = await bcrypt.genSalt(10);
    const senhaCrypt = await bcrypt.hash(password, salt);

    // Criar um objeto user com as informações
    const user = new User(id, username, email, senhaCrypt);

    // Inserir o novo usuário no arquivo
    usuariosBD.push(user);
    fs.writeFileSync(jsonPath, JSON.stringify(usuariosBD, null, 2));
    res.send('Usuário criado com sucesso');
});


// Rota de exibição de todas repúblicas
app.get('/republicas', verificaToken, (req, res) => {

    // Abertura do arquivo de repúblicas
    const jsonPath = path.join(__dirname, '.', 'db', 'banco-dados-republicas.json');
    const republicasBD = JSON.parse(fs.readFileSync(jsonPath, {encoding: 'utf8', flag: 'r'}));

    return res.json(republicasBD);
});


// Rota para exibir república específica
app.get('/republicas/:nome', verificaToken, (req, res) => {

    // Abertura do arquivo de repúblicas
    const jsonPath = path.join(__dirname, '.', 'db', 'banco-dados-republicas.json');
    const republicasBD = JSON.parse(fs.readFileSync(jsonPath, {encoding: 'utf8', flag: 'r'}));

    const params = req.params;

    // Busca da república pra retorno das informações
    for(let rep of republicasBD) {
        if(params.nome === rep.nome) {
            return res.json(rep);
        }
    }
    // Não foi encontrada
    return res.status(403).send('República não encontrada');
});


// Rota para criação de uma inscrição
app.post('/formulario', verificaToken, (req, res) => {

    const {nome, idade, cidade, curso, redeSocial, celular, sobre, curiosidade, motivoEscolha, republica, republicaId, username} = req.body;

    // Abertura do arquivo de inscricoes
    const jsonPathInscricoes = path.join(__dirname, '.', 'db', 'banco-dados-inscricoes.json');
    const inscricoesBD = JSON.parse(fs.readFileSync(jsonPathInscricoes, { encoding: 'utf8', flag: 'r' }));

    // Abertura do arquivo de republicas
    const jsonPathRepublicas = path.join(__dirname, '.', 'db', 'banco-dados-republicas.json');
    const republicasBD = JSON.parse(fs.readFileSync(jsonPathRepublicas, { encoding: 'utf8', flag: 'r' }));

    // Abertura do arquivo de usuarios
    const jsonPathUsuarios = path.join(__dirname, '.', 'db', 'banco-dados-usuario.json');
    const usuariosBD = JSON.parse(fs.readFileSync(jsonPathUsuarios, { encoding: 'utf8', flag: 'r' }));

    // Criação de um id incremental
    const id = inscricoesBD.length + 1;

    // Criando uma inscrição
    const inscricao = new Inscricao(id, nome, idade, cidade, curso, redeSocial, celular, sobre, curiosidade, motivoEscolha, republica);

    // Salvando no arquivo
    inscricoesBD.push(inscricao);
    fs.writeFileSync(jsonPathInscricoes, JSON.stringify(inscricoesBD, null, 2));

    // Salvando o id dessa inscrição no atributo inscrições da república em questão e do usuário logado
    for(let rep of republicasBD) {
        if(republicaId === rep.id) {
            rep.inscricoes.push(id);
            fs.writeFileSync(jsonPathRepublicas, JSON.stringify(republicasBD, null, 2));
        }
    }
    for(let user of usuariosBD) {
        if(username === user.username) {
            user.inscricoes.push(id);
            fs.writeFileSync(jsonPathUsuarios, JSON.stringify(usuariosBD, null, 2));
        }
    }

    res.send('Inscrição realizada com sucesso');
});


// Rota para listar inscrições do usuário
app.get('/inscricoes/:idUser', verificaToken, (req, res) => {

    // Abertura do arquivo de inscricoes
    const jsonPathInscricoes = path.join(__dirname, '.', 'db', 'banco-dados-inscricoes.json');
    const inscricoesBD = JSON.parse(fs.readFileSync(jsonPathInscricoes, { encoding: 'utf8', flag: 'r' }));

    // Abertura do arquivo de usuarios
    const jsonPathUsuarios = path.join(__dirname, '.', 'db', 'banco-dados-usuario.json');
    const usuariosBD = JSON.parse(fs.readFileSync(jsonPathUsuarios, { encoding: 'utf8', flag: 'r' }));

    const params = req.params;
    const listaInscricoes = [];

    // Pegar os ids das inscrições do usuário com id retornado no req.param
    for(let user of usuariosBD) {
        if(params.idUser === user.id) {
            const inscricoesUser = user.inscricoes;
            // Pegar informações das inscrições com os ids, no arquivo
            for(let inscU of inscricoesUser) {
                for(let inscricao of inscricoesBD) {
                    // Se o id da inscrição do usuário for igual o id de uma inscrição no arquivo, adicionar ela em uma lista
                    if(inscU.id === inscricao.id) {
                        listaInscricoes.push(inscricao);
                    }
                }
            }
        }
    }
    // Retornar a lista com as inscrições do usuário em formato de objeto
    return res.json(listaInscricoes);
});


// Rota para retorno das informações do usuário descriptografadas
app.get('/descrypt', verificaToken, (req, res) => {
    
    const authHeaders = req.headers['authorization'];
    const token = authHeaders && authHeaders.split(' ')[1]
    
    try {
      const decodedToken = jwt.decode(token, process.env.TOKEN);
      return res.status(200).json(decodedToken);
    } 
    catch (error) {
      return res.status(401).json({ error: 'Falha na decodificação do token' });
    }
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
        next();
    });
}