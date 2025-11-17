const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const toInt = (val) => {
  const parsed = parseInt(val, 10);
  return isNaN(parsed) ? null : parsed;
};

const getPagamentos = async (req, res) => {
  try {
    const items = await prisma.pagamentos.findMany({
      include: { pedido: true }
    });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPagamentoById = async (req, res) => {
  const id = toInt(req.params.id);
  if (!id) return res.status(400).json({ error: 'ID inválido.' });

  try {
    const item = await prisma.pagamentos.findUnique({
      where: { id },
      include: { pedido: true }
    });

    if (!item) return res.status(404).json({ error: 'Pagamento não encontrado.' });

    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getPagamentos, getPagamentoById };
