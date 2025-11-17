const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const addPedido = async (req, res) => {
  try {
    const data = req.body;
    const created = await prisma.pedidos.create({ data });
    res.status(201).json(created);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = addPedido;
