const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const toInt = (val) => {
  const parsed = parseInt(val, 10);
  return isNaN(parsed) ? null : parsed;
};

const getAllPedidos = async (req, res) => {
  try {
    const items = await prisma.pedidos.findMany({
      include: {
        usuario_final: true,
        mesa: true,
        itens_pedido: { include: { produto: true } },
        pagamentos: true
      }
    });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPedidoById = async (req, res) => {
  const id = toInt(req.params.id);
  if (!id) return res.status(400).json({ error: 'ID inválido.' });

  try {
    const item = await prisma.pedidos.findUnique({
      where: { id },
      include: {
        usuario_final: true,
        mesa: true,
        itens_pedido: { include: { produto: true } },
        pagamentos: true
      }
    });
    if (!item) return res.status(404).json({ error: 'Pedido não encontrado.' });
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllPedidos, getPedidoById };
