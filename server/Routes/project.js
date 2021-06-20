const express = require('express')
const {
  project_list,
  project_create,
  project_update,
  project_delete
} = require('../Controllers/projectController')

const router = express.Router()

router.get('/', project_list)
router.post('/', project_create)
router.put('/', project_update)
router.delete('/', project_delete)

module.exports = router;