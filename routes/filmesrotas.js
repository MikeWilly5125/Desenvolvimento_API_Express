const express = require('express');
const rotas = express.Router();

const mongoose = require('mongoose');
const Filme = require('../model/filmeModel');

let filmes = [
    { id: 1, nome: "Xman", status: "Não assistido" },
    { id: 2, nome: "Batman", status: "Não assistido" },
    { id: 3, nome: "Vingadores", status: "Não assistido" },
    { id: 4, nome: "titanic", status: "Assistido" },
];

rotas.use(teste = (req, res, next) => {
    const { index } = req.params;

    if (filmes.length < index)
        return res.status(400).json({ 'filme não existe': false });
    next();

});

rotas.get('/filme/:index', teste, (req, res) => {

    const { index } = req.params;

    const filme = filmes[index];

    return res.json({ filme });

});

rotas.get('/filme', async (req, res) => {

    try {

        const filmes = await Filme.find();
        res.send(filmes);

    } catch (error) {
        res.send('Houve algum erro ao buscar registros');
    }

});

rotas.post('/filme', async (req, res) => {

    try {

        const { nome, status } = req.body;
        const novoFilme = new Filme({
            nome: nome,
            status: status
        })

        await novoFilme.save();
        res.send('registro inserido no banco com sucesso!');

    } catch (error) {
        console.error('erro');

    } finally {
        console.log('Banco de dados foi acionado');

    }
});

rotas.put('/filme/:id', async (req, res) => {

    const filmeId = req.params.id;
    const { nome, status } = req.body;

    try {

        const filme = await Filme.findByIdAndUpdate(filmeId, {
            nome, //no caso de o valor da variável for igual ao valor do prorpiedade definida no banco posso passar o valor aoenas uma vez ao invez de escrever "nome:mome"
            status
        })

        if (!filme) {
            return res.status(404).send('Filme não encontrado');
        }

        res.send('filme alteradocom sucesso!!');

        return res.send(`filme alterado com sucesso!! ${nome}`);

    } catch (error) {
        res.send(error);

    }

});

rotas.delete('/filme/:id', async (req, res) => {

    const filmeId = req.params.id;
    // const filmeIndex = filmes.findIndex(f => f.id == filmeId) //Retornando o index que o filme se encontra 

    try {

        const FilmeDeletado = await Filme.findByIdAndDelete(filmeId);

        if (!FilmeDeletado) {
            return res.status(404).send('Filme não encontrado');
        }

        res.send('filme deletado com sucesso!');

    } catch (error) {
        res.status(500).send('Houve um erro ado deletar um filme!');
    }

});


module.exports = rotas;