const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function deleteCliente(req, res) {
   const id = parseInt(req.params.id); 
  try {
    await prisma.clientes.delete({
      where: { id: id }
    });

    res.status(204).end();
  } catch (e) {
    throw error;
  }
}

module.exports = deleteCliente;
