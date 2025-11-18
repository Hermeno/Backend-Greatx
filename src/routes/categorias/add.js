const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


module.exports = async (req, res) => {
  const { nome } = req.body;

  if (!nome) {
    return res.status(400).json({ error: 'Campo "nome" é obrigatório.' });
  }

  try {
    const created = await prisma.categorias.create({
      data: { nome }
    });
    res.status(201).json(created);
  } catch (error) {
    // rethrow the original error so asyncHandler / error middleware can handle it
    throw error;
  }
};