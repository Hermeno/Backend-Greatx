const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateCliente(req, res) {
  const { senha, ...dados } = req.body;
  try {
    if (senha) {
      dados.senha = await bcrypt.hash(senha, 10);
    }
    const cliente = await prisma.clientes.update({
      where: { id: idInt(req.params.id) },
      data: dados
    });

    res.json(cliente);
  } catch (e) {
    throw e;
  }
}

module.exports = updateCliente;
