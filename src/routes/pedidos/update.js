const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const toInt = (val) => {
  const parsed = parseInt(val, 10);
  return isNaN(parsed) ? null : parsed;
};

const updatePedido = async (req, res) => {
  const id = toInt(req.params.id);
  if (!id) return res.status(400).json({ error: 'ID inválido.' });

  try {
    const updated = await prisma.pedidos.update({
      where: { id },
      data: req.body
    });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = updatePedido;
