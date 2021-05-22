const express = require('express'), bodyParser = require('body-parser'), cors = require('cors')
const app = express()
const {origin, port} = require('./constants')
const connect = require('./database')
const {sqlProjects} = require('./dbQueryes')


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

app.listen(port, () => {
  console.log(new Date(), 'server already have launched')
})