const connect = require('../database');
require('dotenv').config();

const {
    projectListFormatter
} = require('../formatters');

const sqlTypes = {
    text: `SELECT * FROM ${process.env.DB_TYPE_NAME}`
}

const getTypes = async () => {
    return {
        data: projectListFormatter(await connect.query(sqlTypes, [])),
        status: 200
    }
}

module.exports = {
    getTypes
  }