const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const toInt = (val) => {
  const parsed = parseInt(val, 10);
  return isNaN(parsed) ? null : parsed;
};

// GET all
exports.getAll = async (req, res) => {
  try {
    const categorias = await prisma.categorias.findMany();
    res.json(categorias);
  } catch (error) {
    throw error;
  }
};

// GET by ID
exports.getById = async (req, res) => {
  const id = toInt(req.params.id);
  if (!id) return res.status(400).json({ error: 'ID inválido.' });

  try {
    const categoria = await prisma.categorias.findUnique({
      where: { id }
    });

    if (!categoria) {
      return res.status(404).json({ error: 'Categoria não encontrada.' });
    }

    res.json(categoria);
  } catch (error) {
    throw error;
  }
};
