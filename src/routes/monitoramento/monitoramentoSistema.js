const express = require('express');
const router = express.Router();
const asyncHandler = require('../../asyncHandler');

const addRegistro = require('./add');
const { getAll, getById } = require('./select');
const updateRegistro = require('./update');
const deleteRegistro = require('./del');

// Rotas
router.post('/', asyncHandler(addRegistro));
router.get('/', asyncHandler(getAll));
router.get('/:id', asyncHandler(getById));
router.put('/:id', asyncHandler(updateRegistro));
router.delete('/:id', asyncHandler(deleteRegistro));
// router.post('/', addRegistro);

module.exports = router;
