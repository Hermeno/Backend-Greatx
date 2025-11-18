const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


module.exports = async (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID inválido.' });
  }

  try {
    const deleted = await prisma.categorias.delete({
      where: { id }
    });
    res.json(deleted);
  } catch (error) {
    // rethrow the original error so asyncHandler / error middleware can handle it
    throw error;
  }
};