const connect = require('../database');
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
    text: `SELECT * FROM taskdeskdb LIMIT $1 OFFSET $2`
}
const sqlTasks = {
    text: `SELECT * FROM taskdeskdb WHERE project_id = $1 LIMIT $2 OFFSET $3`
}

const sqlInsertTask = {
    text: `INSERT INTO taskdeskdb (project_id, name, code, description, type, task_status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, project_id, name,  code, description, type, task_status`
}

const sqlUpdateTask = {
    text: `UPDATE taskdeskdb SET name = $2, code = $3, description = $4, task_status = $6, type = $5 WHERE id = $1 RETURNING name, code, description`
}

const sqlDeleteProject = {
    text: `DELETE FROM taskdeskdb WHERE id = $1 RETURNING id, name, code`
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

const createNewTask = async (project_id, name, code, description, type, task_status) => {
    // const errors = taskDataValidator(project_id, name, code)
    // if (errors.code || errors.project_id || errors.name) {
    //     return {
    //         data: errors,
    //         status: 400
    //     }
    // }
    return {
        data: await connect.query(sqlInsertTask, [project_id, name, code, description, type, task_status]),
        status: 200
    }
}

const updateTask = async (project_id, name, code, description, type, task_status) => {
    return {
        data: await connect.query(sqlUpdateTask, [project_id, name, code, description, type, task_status]),
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
    getAllTasksAll,
    getAllTasks,
    createNewTask,
    updateTask,
    deleteTask
}


// add status
