// Importando o express
const express = require('express')

// Importando o CORS
const cors = require('cors')

// Inicializando o servidor (express() -> Express inicializado)
const server = express()

// Permite que o servidor/API receba e envie informações do formato JSON
server.use(express.json())

// Utilizando o CORS no servidor
server.use(cors())

// Importando as rotas
const TaskRoutes = require('./routes/TaskRoutes')

// Passando as rotas para o servidor
// /task funcionará como um pré fixo, todas rotas devem utilizar /task e com isso em TaskRoutes não precisaremos informar
// /task na rota de create por exemplo
server.use('/task', TaskRoutes)

server.listen(3001, () => {
    console.log('API ON')
})