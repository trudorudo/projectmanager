const connect = require('../database');
const {
    projectListFormatter
} = require('../formatters');

const sqlStatuses = {
    text: 'SELECT * FROM statuses_list'
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