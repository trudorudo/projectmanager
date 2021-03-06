const {
  getAllTasks,
  getAllTasksAll,
  createNewTask,
  updateTask,
  deleteTask
} = require('../Models/tasksModel')

const task_list_all = async (req, res) => {
  const {
    query: {
      limit,
      offcet
    }
  } = req
  const {
    data,
    status
  } = await getAllTasksAll(limit, offcet)
  res.status(status).send(data)
}

const task_list = async (req, res) => {
  const {
    params: {
      project_id
    },
    query: {
      limit,
      offcet
    }
  } = req
  const {
    data,
    status
  } = await getAllTasks(project_id, limit, offcet)
  res.status(status).send(data)
}

const task_create = async (req, res) => {
  const {
    body: {
      project_id,
      name,
      description,
      type_id,
      status_id
    }
  } = req
  const {
    data : {rows},
    status
  } = await createNewTask(project_id, name, description, type_id, status_id)
  res.status(status).send(rows[0])
}

const task_update = async (req, res) => {
  const {
    body: {
      id,
      name,
      code,
      description,
      type_name,
      status_id
    }
  } = req
  const {
    data,
    status
  } = await updateTask(id, name, code, description, type_name, status_id)
  res.status(status).send(data)
}

const task_delete = async (req, res) => {
  const {
    body: {
      id
    }
  } = req
  const {
    data,
    status
  } = await deleteTask(id)
    const project_id = data.rows[0].project_id
    const {data : {rows}} = await getAllTasks(project_id)

  res.status(status).send(rows)
}

module.exports = {
  task_list_all,
  task_list,
  task_create,
  task_update,
  task_delete
}