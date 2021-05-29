const express = require('express'), bodyParser = require('body-parser'), cors = require('cors')
const app = express()
const {origin, port} = require('./constants')
const connect = require('./database')
const {sqlProjects, sqlInsertProject, sqlDeleteProject, sqlUpdateProject} = require('./dbQueryes')


app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors({origin : origin}))
app.use(express.json())

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", 'true')
  res.header("Access-Control-Allow-Origin", origin)
  res.header("Access-Control-Allow-Headers", 'Origin, X-Requested-With, Content-Type, Accept, Redirect, Authorization')
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, PATCH, DELETE, OPTIONS")
  next()
})

app.get('/api/v1/projects/', async (req, res) => {
  const {rows} = await connect.query(sqlProjects)
  res.status(200).send(rows)
})

app.post('/api/v1/projects/', async (req, res) => {
  const {body: {name, code}} = req
  const {rows} = await connect.query(sqlInsertProject, [name, code])
  res.status(200).send(rows)
})

app.delete('/api/v1/projects/', async (req, res) => {
  const {body: {id}} = req
  const {rows} = await connect.query(sqlDeleteProject, [id])
  res.status(200).send(rows)
})

app.put('/api/v1/projects/', async (req, res) => {
  const {body: {id, name, code}} = req
  const {rows} = await connect.query(sqlUpdateProject, [id, name, code])
  res.status(200).send(rows)
})

app.listen(port, () => {
  console.log(new Date(), 'server already have launched')
})