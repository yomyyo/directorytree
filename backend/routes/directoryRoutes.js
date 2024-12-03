const express = require('express');
const { createDirectory, moveDirectory, deleteDirectory, listDirectories } = require('../controllers/directoryController');

const router = express.Router();

router.post('/create', createDirectory);
router.post('/move', moveDirectory);
router.delete('/delete', deleteDirectory);
router.get('/list', listDirectories);

module.exports = router;
