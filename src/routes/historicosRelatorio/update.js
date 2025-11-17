const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const toInt = (val) => {
  const parsed = parseInt(val, 10);
  return isNaN(parsed) ? null : parsed;
};

module.exports = async (req, res) => {
  const id = toInt(req.params.id);
  if (!id) return res.status(400).json({ error: 'ID inválido.' });

  const { cliente_id, nome_arquivo, tipo, data_geracao } = req.body;

  try {
    const updated = await prisma.historico_relatorios.update({
      where: { id },
      data: {
        cliente_id,
        nome_arquivo,
        tipo,
        data_geracao: data_geracao ? new Date(data_geracao) : undefined
      }
    });

    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
