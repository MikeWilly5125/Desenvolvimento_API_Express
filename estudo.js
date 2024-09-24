// const numeros = [1,2,3,4,5,6,7,8,9,10, 10];

// const tirarDuplicados = list => Array.from(new Set(list))
// console.log(tirarDuplicados(numeros))

const rotas = require('./estudorotas');
const express =  require('express');
const server = express();
server.use(express.json())

const jwt = require('jsonwebtoken');
require('dotenv').config();


server.get('/login', (req, res) => {

    const {user, password} = req.body

    const usuariosId = [
        {id: 1, user: "MikeWilly", password: 12345 },
        {id: 2, user: "Paulo", password: 123456 },
        {id: 3, user: "João", password: 1234567 },
    ]

    const idUser = 1

    if (user == usuariosId[idUser].user && usuariosId[idUser].password == password) {
        const SECRET = process.env.SECRET;

        const id = usuariosId[idUser].id
        const token = jwt.sign({id}, SECRET,
            {
                  expiresIn: 3000
            }

        );
        
        return res.send(token)
    }

    res.status(500).send('Problema ao gerar token')


   

    


})


server.use(rotas)
server.listen(3000)
