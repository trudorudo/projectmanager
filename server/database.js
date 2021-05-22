const {Client} = require('pg')

const connect = () => {
  const myClient = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'crud',
    password: 'blablabla5',
    port: 5432
  });
  myClient.connect()
  return myClient
}

module.exports = connect()