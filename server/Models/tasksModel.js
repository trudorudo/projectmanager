const connect = require('../database');
const {
    projectListFormatter
} = require('../formatters');

const taskDataValidator = (projectId, name, code) => {
    const errors = {};

    if (!name) errors.name = 'task name is required field';
    if (!projectId) errors.projectId = 'project ID is required to create a task';
    if (code.match(/[\ -\@]/g)) errors.code = 'code can not contain any special chracters';

}
const sqlTasks = {
    text: `SELECT * FROM taskdeskdb WHERE projectId = $1`
}

const sqlInsertTask = {
    text: `INSERT INTO taskdeskdb (projectId, name, code, description) VALUES ($1, $2, $3, $4) RETURNING id, projectId, name,  code, description`
}

const sqlUpdateTask = {
    text: `UPDATE taskdeskdb SET name = $3, code = $2,  description = $4 WHERE id = $1 RETURNING taskId, name, code, description`
}

const sqlDeleteProject = {
    text: `DELETE FROM taskdeskdb WHERE id = $1 RETURNING id, name, code`
}

const getAllTasks = async (limit = 99999, offset = 0) => {
    return {
        data: projectListFormatter(await connect.query(sqlTasks, [limit, offset])),
        status: 200
    }
}

const createNewTask = async (projectId, name, code, description) => {
    const errors = taskDataValidator(projectId, name, code)
    if (errors.code || errors.projectId || errors.name) {
        return {
            data: errors,
            status: 400
        }
    }
    return {
        data: await connect.query(sqlInsertTask, [projectId, name, code, description]),
        status: 200
    }
}

const updateTask = async (projectId, name, code, description) => {
    return {
        data: await connect.query(sqlUpdateTask, [projectId, name, code, description]),
        status: 200
    }
}

const deleteTask = async (id) => {
    return {
        data: await connect.query(sqlDeleteProject, [id]),
        status: 200
    }
}

module.exports = {
    getAllTasks,
    createNewTask,
    updateTask,
    deleteTask
}