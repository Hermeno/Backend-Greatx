const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const toInt = (val) => {
  const parsed = parseInt(val, 10);
  return isNaN(parsed) ? null : parsed;
};

module.exports = async (req, res) => {
  const id = toInt(req.params.id);
  if (!id) return res.status(400).json({ error: 'ID inválido.' });

  const { usuario_final_id, beneficio, data_uso } = req.body;

  try {
    const updated = await prisma.historico_beneficios.update({
      where: { id },
      data: {
        usuario_final_id,
        beneficio,
        data_uso: data_uso ? new Date(data_uso) : undefined
      }
    });

    res.json(updated);
  } catch (error) {
    throw error;
  }
};
