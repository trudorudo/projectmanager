const {
    getAllTasks,
    createNewTask,
    updateTask,
    deleteTask
} = require('../Models/tasksModel');

const task_list = async (req, res) => {
    const {
        params: {
            project_id
        },
        query: {
            limit,
            offcet
        }
    } = req;
    console.log('project_id, limit, offcet'+project_id, limit, offcet)
    const {
        data,
        status
    } = await getAllTasks(project_id, limit, offcet);
    res.status(status).send(data);
};

const task_create = async (req, res) => {
    const {
        body: {
            projectId,
            name,
            code,
            description
        }
    } = req;
    const {
        data,
        status
    } = await createNewTask(projectId, name, code, description);
    res.status(status).send(data);
}

const task_update = async (req, res) => {
    const {
        body: {
            projectId,
            name,
            code,
            description
        }
    } = req;
    const {
        data,
        status
    } = await updateTask(projectId, name, code, description);
    res.status(status).send(data);
}

const task_delete = async (req, res) => {
    const {
        body: {
            id
        }
    } = req;
    const {
        data,
        status
    } = await deleteTask(id);
    res.status(status).send(data)
}

module.exports = {
    task_list,
    task_create,
    task_update,
    task_delete
}