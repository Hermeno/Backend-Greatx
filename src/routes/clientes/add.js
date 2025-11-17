const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
// const { idInt } = require('../../utils/validation');

async function addCliente(req, res, next) {
  const { nome, email, telefone, senha, endereco, tipo_cliente, nivel_acesso } = req.body;
  console.log(req.body);
    const hash = await bcrypt.hash(senha, 10);
    const cliente = await prisma.clientes.create({
      data: { nome, email, telefone, senha: hash, endereco, tipo_cliente, nivel_acesso }
    });
    res.status(201).json(cliente);
}

module.exports = addCliente;

