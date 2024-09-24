const express = require('express')
const rotas = express.Router()

rotas.get('/filme', (req, res) => {
    return res.send('teste1 ok');
});




module.exports = rotas;
