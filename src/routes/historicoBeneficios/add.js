const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async (req, res) => {
  const { usuario_final_id, beneficio, data_uso } = req.body;

  try {
    const created = await prisma.historico_beneficios.create({
      data: {
        usuario_final_id,
        beneficio,
        data_uso: data_uso ? new Date(data_uso) : undefined
      }
    });

    res.status(201).json(created);
  } catch (error) {
    throw error;
  }
};
