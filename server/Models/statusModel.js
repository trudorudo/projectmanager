const connect = require('../database');
require('dotenv').config();

const {
    projectListFormatter
} = require('../formatters');

const sqlStatuses = {
    text: `SELECT * FROM ${process.env.DB_STATUS_NAME}`
}

const getStatuses = async () => {
    return {
        data: projectListFormatter(await connect.query(sqlStatuses, [])),
        status: 200
    }
}

module.exports = {
    getStatuses
  }