const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const toInt = (val) => {
  const parsed = parseInt(val, 10);
  return isNaN(parsed) ? null : parsed;
};

exports.getAll = async (req, res) => {
  try {
    const items = await prisma.historico_beneficios.findMany({
      include: { usuario_final: true }
    });

    res.status(200).json(items);
  } catch (error) {
    throw error;
  }
};

exports.getById = async (req, res) => {
  const id = toInt(req.params.id);
  if (!id) return res.status(400).json({ error: 'ID inválido.' });

  try {
    const item = await prisma.historico_beneficios.findUnique({
      where: { id },
      include: { usuario_final: true }
    });

    if (!item) {
      return res.status(404).json({ error: 'Histórico não encontrado.' });
    }

    res.json(item);
  } catch (error) {
    throw error;
  }
};
