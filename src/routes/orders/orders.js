const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function validateOrderBody(body) {
  const errors = [];
  if (!body) {
    errors.push('Body is required');
    return errors;
  }
  if (!body.userId) errors.push('userId is required');
  if (!body.restaurantId) errors.push('restaurantId is required');
  if (!Array.isArray(body.items) || body.items.length === 0) errors.push('items must be a non-empty array');
  if (typeof body.total !== 'number') errors.push('total must be a number');
  if (Array.isArray(body.items)) {
    body.items.forEach((it, idx) => {
      if (!it || typeof it !== 'object') return errors.push(`items[${idx}] must be an object`);
      if (!('menuItemId' in it)) errors.push(`items[${idx}].menuItemId is required`);
      if (typeof it.quantity !== 'number' || it.quantity <= 0) errors.push(`items[${idx}].quantity must be a positive number`);
      if (typeof it.price !== 'number' || it.price < 0) errors.push(`items[${idx}].price must be a non-negative number`);
    });
  }
  return errors;
}

// POST /orders - persist using Prisma (pedidos + itensPedido)
router.post('/', async (req, res) => {
  try {
    const body = req.body;
    const errors = validateOrderBody(body);
    if (errors.length) return res.status(400).json({ error: 'Invalid request', details: errors });

    const computedTotal = body.items.reduce((acc, it) => acc + (it.price * it.quantity), 0);
    if (Math.abs(computedTotal - body.total) > 0.01) {
      return res.status(400).json({ error: 'total does not match sum of items' });
    }

    // try to map provided ids to DB ids
    const parsedUserId = parseInt(body.userId, 10);
    const clienteId = Number.isFinite(parsedUserId) ? parsedUserId : null;

    const parsedRestaurantId = parseInt(body.restaurantId, 10);
    let mesaId = null;
    if (Number.isFinite(parsedRestaurantId) && body.mesa) {
      const mesaNum = parseInt(body.mesa, 10);
      if (Number.isFinite(mesaNum)) {
        const mesa = await prisma.mesas.findFirst({ where: { numero: mesaNum, estabelecimento_id: parsedRestaurantId } });
        if (mesa) mesaId = mesa.id;
      }
    }

    // build itens to create
    const itensParaCriar = [];
    for (const it of body.items) {
      const menuItemParsed = parseInt(it.menuItemId, 10);
      let produtoId = null;
      if (Number.isFinite(menuItemParsed)) {
        const produto = await prisma.produtos.findUnique({ where: { id: menuItemParsed } });
        if (produto) produtoId = produto.id;
      }
      if (!produtoId) {
        // If produto not found, we can still store item with null produto reference (produto_id nullable). But itensPedido.produto_id allows null.
        itensParaCriar.push({ produto_id: null, quantidade: it.quantity, preco_unitario: it.price });
      } else {
        itensParaCriar.push({ produto_id: produtoId, quantidade: it.quantity, preco_unitario: it.price });
      }
    }

    const pedidoCriado = await prisma.pedidos.create({
      data: {
        cliente_id: clienteId ?? null,
        mesa_id: mesaId ?? null,
        status: 'pending_payment',
        total: computedTotal,
        itensPedido: { create: itensParaCriar }
      },
      include: { itensPedido: true }
    });

    return res.status(201).json({ orderId: pedidoCriado.id, status: pedidoCriado.status, createdAt: pedidoCriado.data_hora });
  } catch (error) {
    console.error('POST /orders error (prisma):', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /orders/:orderId - fetch from prisma
router.get('/:orderId', async (req, res) => {
  try {
    const id = parseInt(req.params.orderId, 10);
    if (!Number.isFinite(id)) return res.status(400).json({ error: 'Invalid orderId' });
    const pedido = await prisma.pedidos.findUnique({
      where: { id },
      include: { mesa: true, itensPedido: { include: { produto: true } }, pagamentos: true }
    });
    if (!pedido) return res.status(404).json({ error: 'Order not found' });
    return res.status(200).json(pedido);
  } catch (error) {
    console.error('GET /orders/:orderId error (prisma):', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /orders/:orderId/status - update status
router.put('/:orderId/status', async (req, res) => {
  try {
    const id = parseInt(req.params.orderId, 10);
    if (!Number.isFinite(id)) return res.status(400).json({ error: 'Invalid orderId' });
    const { status } = req.body;
    const allowed = ['pending_payment', 'paid', 'cancelled'];
    if (!allowed.includes(status)) return res.status(400).json({ error: `status must be one of ${allowed.join(', ')}` });

    const pedidoAtualizado = await prisma.pedidos.update({ where: { id }, data: { status } });
    return res.status(200).json(pedidoAtualizado);
  } catch (error) {
    console.error('PUT /orders/:orderId/status error (prisma):', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
