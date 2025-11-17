const express = require('express');
const router = express.Router();

const addHistorico = require('./add');
const { getAll, getById } = require('./select');
const updateHistorico = require('./update');
const deleteHistorico = require('./del');

// Rotas CRUD
router.post('/', addHistorico);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', updateHistorico);
router.delete('/:id', deleteHistorico);

module.exports = router;
