const express = require('express');
const rotas = require('./routes/filmesrotas');
const server = express();
server.use(express.json());
const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('Banco conectado com sucesso!!');
    })
    .catch(() => {
        console.error('banco com erro');
    })


server.post('/login', (req, res, next) => {

    const { usuario, senha } = req.body;
    if (usuario == 'osvaldo' && senha == 123456) {
        const SECRET = process.env.SECRET;

        const id = 1;
        const token = jwt.sign({ id }, SECRET,
            {
                expiresIn: 3000
            }
        );

        return res.send(token);
    }

    return res.status(500).send("Usuario ou Senha incorreta");
})

function verificaToken(req, res, next) {
    const token = req.headers['x-acess-token'];

    if (!token) {
        return res.status(401).json({ autenticacao: false, mensagem: "token invalido!" });

    }

    const SECRET = process.env.SECRET;

    jwt.verify(token, SECRET, function (error, decoded) {
        if (error) {
            res.status(500).json({ autenticacao: false, mensagem: "Falha ao validar token" });
        }

        req.usuarioId = decoded.id;
        next();

    })

}



server.use(verificaToken);
server.use(rotas);
server.listen(2000, () => {
    console.log('Servidor iniciado com sucesso!!');
})





