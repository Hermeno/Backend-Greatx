const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async (req, res) => {
  const { estabelecimento_id, numero, status } = req.body;

  try {
    const novaMesa = await prisma.mesas.create({data: {  estabelecimento_id,  numero,  status}
    });
    res.status(201).json(novaMesa);
  } catch (error) {
    throw error;
  }
};
