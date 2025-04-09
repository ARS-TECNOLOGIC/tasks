const tasksModel = require('../models/tasksModel')

//Usei o Underline no req pois o mesmo não esta sendo utilizado
const getAll = async (_req, resp)=>{
    tasks = await tasksModel.getAll();
    return  resp.status(200).json(tasks);
};

const createTask = async (req,resp) =>{
    const createTask = await tasksModel.createTask(req.body);
    return resp.status(201).json(createTask);
}

const deleteTask = async(req,resp) =>{
    const {id} = req.params;
    await tasksModel.deleteTask(id);
    return resp.status(204).json();
}
const updateTask = async(req,resp) =>{
    const {id} = req.params;
    await tasksModel.updateTask(id,req.body);
    return resp.status(204).json();
}

module.exports ={
    getAll,
    createTask,
    deleteTask,
    updateTask,
};