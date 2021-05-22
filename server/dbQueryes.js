const sqlProjects = {
  text: 'SELECT * FROM projectdeskdb.projects'
}

const sqlInsertProject = {
  text: 'INSERT INTO projectdeskdb.projects (name, code) VALUES ($1, $2)'
}


module.exports = {
  sqlProjects,
  sqlInsertProject
}