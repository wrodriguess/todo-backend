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
    }else{
        // Verificando se já existe uma tarefa no mesmo dia e hora para esse macaddress
        let exists

        // Verificando se foi passado id no req.params 
        // Caso exista se trata de um update e pode ser no mesmo dia e horário
        if(req.params.id){
            exists = await TaskModel.findOne({
                                                // Verifica se o ID não é igual ao passado (Irá ignorar caso a única tarefa encontrada seja a do mesmo id e exists receberá false)
                                                '_id': {'$ne': req.params.id}, 
                                                'when': {'$eq': new Date(when)}, 
                                                'macaddress': {'$in': macaddress}
                                            })
        }else{
            // Caso seja uma nova tarefa irá verificar se a data e hora é futura
            if(isPast(new Date(when))){
                return res.status(400).send({error: 'Escolha uma data e hora futura'})
            }

            exists = await TaskModel.findOne({
                                                'when': {'$eq': new Date(when)}, 
                                                'macaddress': {'$in': macaddress}
                                            })
        }

        if(exists){
            return res.status(400).send({error: 'Já existe uma tarefa nesse dia e hora'})
        }

        next()
    }
}

module.exports = TaskValidation