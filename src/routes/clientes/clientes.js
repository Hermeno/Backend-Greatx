const express = require('express');
const router = express.Router();
const asyncHandler = require('../../asyncHandler');

// Importar funções
const addCliente = require('./add');
const updateCliente = require('./update');
const { getClientes, getClienteById } = require('./select');
const deleteCliente = require('./del');
const login = require('./login');

// Mapear endpoints
router.post('/', (addCliente));
router.get('/', asyncHandler(getClientes));
router.get('/:id', asyncHandler(getClienteById));
router.put('/:id', asyncHandler(updateCliente));
router.delete('/:id', asyncHandler(deleteCliente));
router.post('/login', (login));

module.exports = router;
