const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();







module.exports = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { nome } = req.body;

  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID inválido.' });
  }

  if (!nome) {
    return res.status(400).json({ error: 'Campo "nome" é obrigatório.' });
  }

  try {
    const updated = await prisma.categorias.update({
      where: { id },
      data: { nome }
    });
    res.json(updated);
  } catch (error) {
    // rethrow the original error so asyncHandler / error middleware can handle it
    throw error;
  }
};
