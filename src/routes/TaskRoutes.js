// Aqui serão criadas as rotas da API

// Importando o express
const express = require('express')

// Responsavel por identificar as rotas
const router = express.Router()

// Importando o TaskController para poder utilizar seus métodos
const TaskController = require('../controller/TaskController')

// Criando uma rota do tipo post (Toda vez que chegar uma requisição do tipo POST em /task irei chamar a função create)
// 1º Parametro: Caminho da rota
// 2º Parametro: Método que será chamado
router.post('/', TaskController.create)


module.exports = router


