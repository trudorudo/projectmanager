const express = require('express'), bodyParser = require('body-parser'), cors = require('cors')
const app = express()
const {origin, port} = require('./constants')
const projectRouter = require('./Routes/project')
const taskRouter = require('./Routes/task')

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

app.use('/api/v1/projects', projectRouter)
app.use('/api/v1/tasks', taskRouter)

app.listen(port, () => {
  console.log(new Date(), 'server was launched on port ' + port)
})