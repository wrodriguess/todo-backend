const {isPast} = require('date-fns')

const TaskModel = require('../model/TaskModel')

async function TaskValidation(req, res, next){
    // Desestruturando o objeto vindo de req.body
    const {macaddress, type, title, description, when} = req.body

    //Verificando se todos os campos foram informados
    if(!macaddress){
        return res.status(400).send({error: 'Macaddress é obrigatório'})
    }else if(!type){
        return res.status(400).send({error: 'Tipo é obrigatório'})
    }else if(!title){
        return res.status(400).send({error: 'Titulo é obrigatório'})
    }else if(!description){
        return res.status(400).send({error: 'Descrição é obrigatório'})
    }else if(!when){
        return res.status(400).send({error: 'Data e hora são obrigatórios'})
    }else if(isPast(new Date(when))){
        return res.status(400).send({error: 'Escolha uma data e hora futura'})
    }else{
        // Verificando se já existe uma tarefa no mesmo dia e hora para esse macaddress
        let exists
        exists = await TaskModel.findOne({'when': {'$eq': new Date(when)}, 'macaddress': {'$in': macaddress}})

        if(exists){
            return res.status(400).send({error: 'Já existe uma tarefa nesse dia e hora'})
        }

        next()
    }
}

module.exports = TaskValidation