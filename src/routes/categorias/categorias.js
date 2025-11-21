const express = require('express');
const router = express.Router();


const asyncHandler = require('../../asyncHandler');
const addCategoria = require('./add');
const { getAll, getById } = require('./select');

const updateCategoria = require('./update');
const deleteCategoria = require('./del');

// Rotas
router.post('/', asyncHandler(addCategoria));
router.get('/', asyncHandler(getAll));
router.get('/:id', asyncHandler(getById));
router.put('/:id', asyncHandler(updateCategoria));
router.delete('/:id', asyncHandler(deleteCategoria));

module.exports = router;