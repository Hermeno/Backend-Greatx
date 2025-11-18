const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



module.exports = async (req, res) => {
  try {
    const categorias = await prisma.categorias.findMany();
    res.json(categorias);
  } catch (error) {
    // rethrow the original error so asyncHandler / error middleware can handle it
    throw error;
  }
};

// getById

module.exports = async (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID inválido.' });
  }

  try {
    const categoria = await prisma.categorias.findUnique({
      where: { id }
    });

    if (!categoria) {
      return res.status(404).json({ error: 'Categoria não encontrada.' });
    }

    res.json(categoria);
  } catch (error) {
    // rethrow the original error so asyncHandler / error middleware can handle it
    throw error;
  }
};







