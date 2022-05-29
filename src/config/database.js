// Importando o mongoose
const mongoose = require('mongoose')

// URL de conexão com o mongo
            //localhost:PORTA/NOME_DO_BANCO
const url = 'mongodb://localhost:27017/todo'

// Fazendo conexão com o banco de dados
mongoose.connect(url, {useNewUrlParser: true})

// Exportando o arquivo
module.exports = mongoose