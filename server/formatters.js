
const projectListFormatter = ({rows, fields, rowCount}) => ({
  data: rows,
  fields: fields,
  count: rowCount
})

module.exports = {projectListFormatter}