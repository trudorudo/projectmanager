const express = require('express')
const {
    status_list
} = require('../Controllers/statusControlles');

const router = express.Router();

router.get('/', status_list);

module.exports = router