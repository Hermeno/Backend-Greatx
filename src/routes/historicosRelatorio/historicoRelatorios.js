const express = require('express');
const router = express.Router();
const asyncHandler = require('../../asyncHandler');

const addRelatorio = require('./add');
const { getAll, getById } = require('./select');
const updateRelatorio = require('./update');
const deleteRelatorio = require('./del');

// Rotas CRUD
router.post('/', asyncHandler(addRelatorio));
router.get('/', asyncHandler(getAll));
router.get('/:id', asyncHandler(getById));
router.put('/:id', asyncHandler(updateRelatorio));
router.delete('/:id', asyncHandler(deleteRelatorio));

module.exports = router;
