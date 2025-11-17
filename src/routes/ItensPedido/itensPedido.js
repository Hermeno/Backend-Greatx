const express = require('express');
const router = express.Router();
const asyncHandler = require('../../asyncHandler');

const addItem = require('./add');
const { getAll, getById } = require('./select');
const updateItem = require('./update');
const deleteItem = require('./del');

// Rotas
router.post('/', asyncHandler(addItem));
router.get('/', asyncHandler(getAll));
router.get('/:id', asyncHandler(getById));
router.put('/:id', asyncHandler(updateItem));
router.delete('/:id', asyncHandler(deleteItem));

module.exports = router;
