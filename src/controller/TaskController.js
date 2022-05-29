// Importando o model
const TaskModel = require('../model/TaskModel')

// Classe TaskController
class TaskController{
    // Métodos da classe
    async create(req, res){
        // Instanciando o TaskModel e passando as informações do corpo da requisição como parametro para os atributos de TaskModel
        const task = new TaskModel(req.body)
        await task
                .save()
                .then(response => {
                    return res.status(201).json(response)
                })
                .catch(error => {
                    return res.status(500).json(error)
                })
    }
}

// Instanciando TaskController e exportando o mesmo
module.exports = new TaskController()