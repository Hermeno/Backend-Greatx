const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const categoriaService = {
  add: async (nome) => prisma.categorias.create({ data: { nome } }),
  getAll: async () => prisma.categorias.findMany({ include: { produtos: true } }),
  getById: async (id) => prisma.categorias.findUnique({ where: { id }, include: { produtos: true } }),
  update: async (id, nome) => prisma.categorias.update({ where: { id }, data: { nome } }),
  delete: async (id) => prisma.categorias.delete({ where: { id } }),
};

module.exports = categoriaService;
