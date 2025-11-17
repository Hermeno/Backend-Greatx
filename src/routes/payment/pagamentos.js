const express = require('express');
const router = express.Router();
const asyncHandler = require('../../asyncHandler');

const addPagamento = require('./add');
const { getPagamentos, getPagamentoById } = require('./select');
const updatePagamento = require('./update');
const deletePagamento = require('./del');

// rotas
router.post('/', asyncHandler(addPagamento));
router.get('/', asyncHandler(getPagamentos));
router.get('/:id', asyncHandler(getPagamentoById));
router.put('/:id', asyncHandler(updatePagamento));
router.delete('/:id', asyncHandler(deletePagamento));

module.exports = router;
