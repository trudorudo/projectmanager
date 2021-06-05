const express = require('express')
const {
    task_list,
    task_create,
    task_update,
    task_delete
} = require('../Controllers/taskController');

const router = express.Router();

router.get('/:id', task_list);
router.post('/', task_create);
router.put('/:id', task_update);
router.delete('/:id', task_delete);

module.exports = router