const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const toInt = (val) => {
  const parsed = parseInt(val, 10);
  return isNaN(parsed) ? null : parsed;
};

const getAllProdutos = async (req, res) => {
  try {
    const items = await prisma.produtos.findMany({
      include: { estabelecimento: true, categoria: true }
    });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProdutoById = async (req, res) => {
  const id = toInt(req.params.id);
  if (!id) return res.status(400).json({ error: 'ID inválido.' });

  try {
    const item = await prisma.produtos.findUnique({
      where: { id },
      include: { estabelecimento: true, categoria: true }
    });

    if (!item) return res.status(404).json({ error: 'Produto não encontrado.' });

    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// select.js
const getProdutosByCategoriaId = async (req, res) => {
  const categoriaId = parseInt(req.params.categoria_id); // pega do parâmetro
  if (!categoriaId) return res.status(400).json({ error: 'ID inválido' });

  try {
    const produtos = await prisma.produtos.findMany({
      where: { categoria_id: categoriaId },
      include: { categoria: true, estabelecimento: true },
    });
    res.json(produtos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



module.exports = { getAllProdutos, getProdutoById, getProdutosByCategoriaId };
