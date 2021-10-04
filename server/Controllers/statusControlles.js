const {
    getStatuses
} = require('../Models/statusModel');

const status_list = async(req, res) => {
    const {
        data,
        status
    } = await getStatuses();
    res.status(status).send(data)
}

module.exports = {
    status_list
}