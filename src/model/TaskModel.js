// Importando o mongoose utilizando o arquivo de conexão com o BD (mongoose conectado)
const mongoose = require('../config/database')

// Representação de informações que serão armazenadas no banco de dados
const Schema = mongoose.Schema

// Criando meu schema
const TaskSchema = new Schema({
    // Informações que serão armazenadas no banco de dados
    macaddress: {type: String, required: true},
    type: {type: Number, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    when: {type: Date, required: true},
    done: {type: Boolean, default: false},
    created: {type: Date, default: Date.now()}
})

                            // (Nome da tabela no banco, Representação do Schema)
module.exports = mongoose.model('Task', TaskSchema)