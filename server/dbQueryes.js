const sqlProjects = {
  text: 'SELECT * FROM projectdeskdb.projects'
}

const sqlInsertProject = {
  text: `INSERT INTO projectdeskdb.projects (name, code) VALUES ($1, $2) RETURNING id, name, code`
}

const sqlDeleteProject = {
  text: `DELETE FROM projectdeskdb.projects WHERE id = $1 RETURNING id, name, code`
}

const sqlUpdateProject = {
  text: `UPDATE projectdeskdb.projects SET name = $2, code = $3 WHERE id = $1 RETURNING id, name, code`
}


module.exports = {
  sqlProjects,
  sqlInsertProject,
  sqlDeleteProject,
  sqlUpdateProject
}