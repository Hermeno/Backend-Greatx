const express = require('express');
const router = express.Router();

const addMesa = require('./add');
const { getAll, getById } = require('./select');
const updateMesa = require('./update');
const deleteMesa = require('./del');

// Rotas
router.post('/', addMesa);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', updateMesa);
router.delete('/:id', deleteMesa);

module.exports = router;
