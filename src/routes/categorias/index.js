const express = require('express');
const router = express.Router();

const addCategoria = require('./controllers/add');
const getAllCategorias = require('./controllers/select');
const updateCategoria = require('./controllers/update');
const deleteCategoria = require('./controllers/del');

router.post('/', addCategoria);
router.get('/', getAllCategorias);
router.get('/:id', getCategoriaById);
router.put('/:id', updateCategoria);
router.delete('/:id', deleteCategoria);

module.exports = router;