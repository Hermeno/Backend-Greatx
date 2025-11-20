const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const addProduto = async (req, res) => {
  try {
    const { nome, descricao, preco, foto, categoria_id, estabelecimento_id} = req.body;
    if (!nome || !preco) {
      return res.status(400).json({ error: 'Campos "nome" e "preco" são obrigatórios.' });
    }
    const created = await prisma.produtos.create({
      data: {nome, descricao: descricao || null, preco: preco, foto: foto || null, categoria_id: categoria_id || null, estabelecimento_id: estabelecimento_id || null
      }
    });
    res.status(201).json(created);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = addProduto;
