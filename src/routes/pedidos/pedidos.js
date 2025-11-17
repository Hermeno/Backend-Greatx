const express = require('express');
const router = express.Router();
const asyncHandler = require('../../asyncHandler');

const addPedido = require('./add');
const { getAllPedidos, getPedidoById } = require('./select');
const updatePedido = require('./update');
const deletePedido = require('./del');

// Rotas
router.post('/', asyncHandler(addPedido));
router.get('/', asyncHandler(getAllPedidos));
router.get('/:id', asyncHandler(getPedidoById));
router.put('/:id', asyncHandler(updatePedido));
router.delete('/:id', asyncHandler(deletePedido));

module.exports = router;
