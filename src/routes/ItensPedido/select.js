const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const toInt = (val) => {
  const parsed = parseInt(val, 10);
  return isNaN(parsed) ? null : parsed;
};

exports.getAll = async (req, res) => {
  try {
    const items = await prisma.itensPedido.findMany({
      include: { pedido: true, produto: true },
    });

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  const id = toInt(req.params.id);
  if (!id) return res.status(400).json({ error: 'ID inválido.' });

  try {
    const item = await prisma.itensPedido.findUnique({
      where: { id },
      include: { pedido: true, produto: true },
    });

    if (!item) return res.status(404).json({ error: 'Item não encontrado.' });

    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
