const express = require('express')
const {
    task_list_all,
    task_list,
    task_create,
    task_update,
    task_delete
} = require('../Controllers/taskController');

const router = express.Router();

// add get all tasks 
router.get('/', task_list_all);
router.get('/:project_id', task_list);
router.post('/', task_create);
router.put('/', task_update);
router.delete('/', task_delete);

module.exports = router