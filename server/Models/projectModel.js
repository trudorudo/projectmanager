const connect = require('../database');
const {
  projectListFormatter
} = require('../formatters');

const projectListValidator = (limit, offset) => {
  const errors = {}
  if (!parseInt(String(limit))) errors.limit = 'count projects have to be a number'
  if (limit < 1) errors.limit = 'count projects have to be above one'

  if (!parseInt(String(offset)) && offset !== 0) errors.offset = 'offset project have to be a number'
  if (offset < 0) errors.offset = 'offset project have to be above zero'

  return errors
}

// const projectDataValidator = (name, code) => {
//   const errors = {}

//   if (!name) errors.name = 'name cannot be empty'
//   if (!code) errors.code = 'code cannot be empty'

//   if (code.match(/[\ -\@]/g)) errors.code = 'code cannot contain special characters'

//   return errors
// }

const sqlProjects = {
  text: 'SELECT * FROM projectdeskdb LIMIT $1 OFFSET $2'
}

const sqlInsertProject = {
  text: `INSERT INTO projectdeskdb (name, code) VALUES ($1, $2) RETURNING id, name, code`
}

const sqlUpdateProject = {
  text: `UPDATE projectdeskdb SET name = $2, code = $3 WHERE id = $1 RETURNING id, name, code`
}

const sqlDeleteProject = {
  text: `DELETE FROM projectdeskdb WHERE id = $1`
}


const deleteProject = async (id) => {
  return {
    data: await connect.query(sqlDeleteProject, [id]),
    status: 200
  }
}

const updateProject = async (id, name, code) => {
  // const errors = projectDataValidator(name, code)
  // if (errors.code || errors.name) {
  //   return {
  //     data: errors,
  //     status: 400
  //   }
  // }

  return {
    data: await connect.query(sqlUpdateProject, [id, name, code]),
    status: 200
  }
}

const createNewProject = async (name, code) => {
  // const errors = projectDataValidator(name, code)
  // if (errors.code || errors.name) {
  //   return {
  //     data: errors,
  //     status: 400
  //   }
  // }

  return {
    data: await connect.query(sqlInsertProject, [name, code]),
    status: 200
  }
}

const getAllProjects = async (limit = 99999, offset = 0) => {

  const errors = projectListValidator(limit, offset)
  if (errors.limit || errors.offset) {
    return {
      data: errors,
      status: 400
    }
  }

  return {
    data: projectListFormatter(await connect.query(sqlProjects, [limit, offset])),
    status: 200
  }
}

module.exports = {
  deleteProject,
  updateProject,
  createNewProject,
  getAllProjects
}