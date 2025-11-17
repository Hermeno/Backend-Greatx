const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async (req, res) => {
  const { cliente_id, nome_arquivo, tipo, data_geracao } = req.body;

  try {
    const created = await prisma.historico_relatorios.create({
      data: {
        cliente_id,
        nome_arquivo,
        tipo,
        data_geracao: data_geracao ? new Date(data_geracao) : undefined
      }
    });

    res.status(201).json(created);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
