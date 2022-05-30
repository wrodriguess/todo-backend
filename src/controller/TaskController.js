const {startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear} = require('date-fns')

// Importando o model
const TaskModel = require('../model/TaskModel')

// Pegando a data e hora atual
const current = new Date()


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

    async show(req, res){
        await TaskModel.findById(req.params.id)
                        .then(response => {
                            if(response){
                                return res.status(200).json(response)
                            }else{
                                return res.status(404).json({error: 'Tarefa não encontrada'})
                            }
                        })
                        .catch(error => {
                            return res.status(500).json(error)
                        })
    }

    async delete(req, res){
        await TaskModel.deleteOne({'_id': req.params.id})
                        .then(response => {
                            return res.status(200).json(response)
                        })
                        .catch(error => {
                            return res.status(500).json(error)
                        })
    }

    async done(req, res){
        await TaskModel.findByIdAndUpdate(
                                        {'_id': req.params.id},
                                        {'done': req.params.done},
                                        {new: true}
                                    )
                        .then(response => {
                            return res.status(200).json(response)
                        })
                        .catch(error => {
                            return res.status(500).json(error)
                        })
    }

    async late(req, res){
                            // Busque todos os registro que a data (when) são menores que current
        await TaskModel.find({
                                'when': {'$lt': current},
                                'macaddress': {'$in': req.params.macaddress}
                        })
                        .sort('when')
                        .then(response => {
                            return res.status(200).json(response)
                        })
                        .catch(error => {
                            return res.status(500).json(error)
                        })
    }

    async today(req, res){
        await TaskModel.find({
                                'macaddress': {'$in': req.params.macaddress},
                                'when': {'$gte': startOfDay(current), '$lte': endOfDay(current)}
                            })
                        .sort('when')
                        .then(response => {
                            return res.status(200).json(response)
                        })
                        .catch(error => {
                            return res.status(500).json(error)
                        })
    }

    async week(req, res){
        await TaskModel.find({
                                'macaddress': {'$in': req.params.macaddress},
                                'when': {'$gte': startOfWeek(current), '$lte': endOfWeek(current)}
                            })
                        .sort('when')
                        .then(response => {
                            return res.status(200).json(response)
                        })
                        .catch(error => {
                            return res.status(500).json(error)
                        })
    }

    async month(req, res){
        await TaskModel.find({
                                'macaddress': {'$in': req.params.macaddress},
                                'when': {'$gte': startOfMonth(current), '$lte': endOfMonth(current)}
                            })
                        .sort('when')
                        .then(response => {
                            return res.status(200).json(response)
                        })
                        .catch(error => {
                            return res.status(500).json(error)
                        })
    }

    async year(req, res){
        await TaskModel.find({
                                'macaddress': {'$in': req.params.macaddress},
                                'when': {'$gte': startOfYear(current), '$lte': endOfYear(current)}
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