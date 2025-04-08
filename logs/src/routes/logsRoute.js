const express = require('express');
const router = express.Router();
const {createLog, getLog, getLogs, deleteLog, putLog,createLogComposant, getLogsComposant } = require('../controllers/LogsController');

router.get('/logComposant', getLogsComposant); // Define this route first
router.post('/logComposant', createLogComposant); // Define this route first
router.get('/', getLogs);
router.get('/:id', getLog);
router.put('/:id', putLog);
router.delete('/:id', deleteLog);
router.post('/', createLog);

module.exports = router;

