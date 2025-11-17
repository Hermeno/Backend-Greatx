// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();




const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

// Converte id string para inteiro
const idInt = (param) => parseInt(param, 10);

// Trata erros de chave única (ex.: email duplicado)
function tratarErroPrisma(err, res, entidade = 'registro') {
  if (err.code === 'P2002') {
    const campo = err.meta?.target?.join(', ');
    return res.status(400).json({ error: `${campo} já está em uso.` });
  }
  console.error(err);
  return res.status(500).json({ error: `Erro no ${entidade}.` });
}

module.exports = { prisma, bcrypt, idInt, tratarErroPrisma };
