const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getClientes(req, res) {
  try {
    const clientes = await prisma.clientes.findMany({
      include: {
        usuarios_internos: true,
        estabelecimentos: true,
        historico_relatorios: true,
        monitoramento_sistema: true
      }
    });
    res.json(clientes);
  } catch (e) {
    throw e;
  }
}

async function getClienteById(req, res) {
   const id = parseInt(req.params.id); 
  try {
    const cliente = await prisma.clientes.findUnique({
      where: { id: id },
      include: {
        usuarios_internos: true,
        estabelecimentos: true,
        historico_relatorios: true,
        monitoramento_sistema: true
      }
    });

    if (cliente) {
      res.json(cliente);
    } else {
      res.status(404).json({ error: 'Cliente não encontrado' });
    }
  } catch (e) {
    throw e;
  }
}

module.exports = { getClientes, getClienteById };
