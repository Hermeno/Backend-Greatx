const express = require('express');
const router = express.Router();
const asyncHandler = require('../../asyncHandler');

const addEstabelecimento = require('./add');
const { getAll, getById } = require('./select');
const updateEstabelecimento = require('./update');
const deleteEstabelecimento = require('./del');

router.post('/', asyncHandler(addEstabelecimento));
router.get('/', asyncHandler(getAll));
router.get('/:id', asyncHandler(getById));
router.put('/:id', asyncHandler(updateEstabelecimento));
router.delete('/:id', asyncHandler(deleteEstabelecimento));

module.exports = router;
