const {
    getTypes
} = require('../Models/typeModel');

const types_list = async(req, res) => {
    const {
        data,
        status
    } = await getTypes();
    res.status(status).send(data)
}

module.exports = {
    types_list
}