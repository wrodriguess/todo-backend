// Aqui serão criadas as rotas da API

// Importando o express
const express = require('express')

// Responsavel por identificar as rotas
const router = express.Router()

// Importando o TaskController para poder utilizar seus métodos
const TaskController = require('../controller/TaskController')

const TaskValidation = require('../middlewares/TaskValidation')

// Criando uma rota do tipo post (Toda vez que chegar uma requisição do tipo POST em /task irei chamar a função create)
// 1º Parametro: Caminho da rota
// 2º Parametro: Método que será chamado
// Antes de chamadar TaskController.create a requisição irá passar por TaskValidation
router.post('/', TaskValidation, TaskController.create)
router.put('/:id', TaskValidation, TaskController.update)


module.exports = router


