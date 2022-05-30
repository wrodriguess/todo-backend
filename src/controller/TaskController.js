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

    async update(req, res){
        // findByIdAndUpdate
        // 1º Parametro: Qual registro será alterado
        // 2º Parametro: Novos valores do registro
        // 3º Parametro: Ira trazer na resposta o registro atualizado, caso contrário irá atualiza, mas a resposta exibirá os valores antigos
        await TaskModel
                    .findByIdAndUpdate({'_id': req.params.id}, req.body, {new: true})
                    .then(response => {
                        return res.status(200).json(response)
                    })
                    .catch(error => {
                        return res.status(500).json(error)
                    })
    }

    async all(req, res){
        await TaskModel.find({
                                macaddress: {'$in': req.params.macaddress}
                            })
                        .sort('when')
                        .then(response => {
                            return res.status(200).json(response)
                        })
                        .catch(error => {
                            return res.status(500).json(error)
                        })
    }
}

// Instanciando TaskController e exportando o mesmo
module.exports = new TaskController()