const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async (req, res) => {
  const { pedido_id, produto_id, quantidade, preco_unitario } = req.body;

  try {
    const created = await prisma.itensPedido.create({
      data: { pedido_id, produto_id, quantidade, preco_unitario },
    });

    res.status(201).json(created);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
