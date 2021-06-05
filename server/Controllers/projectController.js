const {
  deleteProject,
  updateProject,
  createNewProject,
  getAllProjects
} = require('../Models/projectModel')

const project_list = async (req, res) => {
  const {
    query: {
      limit,
      offset
    }
  } = req
  const {
    data,
    status
  } = await getAllProjects(limit, offset)
  res.status(status).send(data)
}

const project_create = async (req, res) => {
  const {
    body: {
      name,
      code
    }
  } = req
  const {
    data,
    status
  } = await createNewProject(name, code)
  res.status(status).send(data)
}

const project_update = async (req, res) => {
  const {
    body: {
      id,
      name,
      code
    }
  } = req
  const {
    data,
    status
  } = await updateProject(id, name, code)
  res.status(status).send(data)
}

const project_delete = async (req, res) => {
  const {
    body: {
      id
    }
  } = req
  const {
    data,
    status
  } = await deleteProject(id)
  res.status(status).send(data)
}

module.exports = {
  project_list,
  project_create,
  project_update,
  project_delete
}