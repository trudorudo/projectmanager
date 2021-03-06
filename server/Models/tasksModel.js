const connect = require('../database');
require('dotenv').config();

const {
    projectListFormatter
} = require('../formatters');

const taskDataValidator = (project_id, name, code) => {
    const errors = {};

    if (!name) errors.name = 'task name is required field';
    if (!project_id) errors.project_id = 'project ID is required to create a task';
    if (code.match(/[\ -\@]/g)) errors.code = 'code can not contain any special chracters';
}

const sqlAllTasks = { 
    text: `SELECT * FROM ${process.env.DB_TASK_NAME} LIMIT $1 OFFSET $2`
}

const sqlTasks = {
    text: `SELECT * FROM ${process.env.DB_TASK_NAME} WHERE project_id = $1 LIMIT $2 OFFSET $3`
}

const sqlInsertTask = {
    text: `INSERT INTO ${process.env.DB_TASK_NAME} (project_id, name, description, type, status) VALUES ($1, $2, $3, $4, $5) RETURNING id, project_id, name, description, type, status`
}

const sqlUpdateTask = {
    text: `UPDATE ${process.env.DB_TASK_NAME} SET name = $2, code = $3, description = $4, status_id = $6, type = $5 WHERE id = $1 RETURNING name, description`
}

const sqlDeleteTask = {
    text: `DELETE FROM ${process.env.DB_TASK_NAME} WHERE id = $1 RETURNING id, project_id`
}
const getAllTasksAll = async (limit = 99999, offset = 0) => {
    return {
        data: projectListFormatter(await connect.query(sqlAllTasks, [limit, offset])),
        status: 200
    }
}

const getAllTasks = async (project_id, limit = 99999, offset = 0) => {
    return {
        data: projectListFormatter(await connect.query(sqlTasks, [project_id, limit, offset])),
        status: 200
    }
}

const createNewTask = async (project_id, name, description, type_id, status_id) => {
    // const errors = taskDataValidator(project_id, name, code)
    // if (errors.code || errors.project_id || errors.name) {
    //     return {
    //         data: errors,
    //         status: 400
    //     }
    // }
    return {
        data: await connect.query(sqlInsertTask, [project_id, name, description, type_id, status_id]),
        status: 200
    }
}

const updateTask = async (id, name, code, description, type_name, status_id) => {
    console.log(id, name, code, description, type_name, status_id)
    return {
        data: await connect.query(sqlUpdateTask, [id, name, code, description, type_name, status_id]),
        status: 200
    }
}

const deleteTask = async (id) => {
    return {
        data: await connect.query(sqlDeleteTask, [id]),
        status: 200
    }
}

module.exports = {
    getAllTasksAll,
    getAllTasks,
    createNewTask,
    updateTask,
    deleteTask
}


// add status
