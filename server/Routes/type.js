const express = require('express')
const {
    types_list
} = require('../Controllers/typeController');

const router = express.Router();

router.get('/', types_list);

module.exports = router