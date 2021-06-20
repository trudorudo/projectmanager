const connect = require('../database');
const {
    projectListFormatter
} = require('../formatters');

const sqlTypes = {
    text: 'SELECT * FROM types_list'
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