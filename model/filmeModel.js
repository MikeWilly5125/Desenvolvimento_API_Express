const mongoose = require('mongoose');

const filmeSchema = new mongoose.Schema({
    nome: String,
    status: String,
});

const filme = mongoose.model('filme', filmeSchema);


module.exports = filme;



