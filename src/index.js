// Importando o express
const express = require('express')

// Inicializando o servidor (express() -> Express inicializado)
const server = express()

server.get('/teste', (req, res) => {
    res.send('<h1 align="center">Hello World</h1>')
})

server.listen(3001, () => {
    console.log('API ON')
})