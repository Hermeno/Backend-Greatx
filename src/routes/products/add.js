const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const addProduto = async (req, res) => {
  try {
    const body = req.body;

    if (!Array.isArray(body)) {
      const { nome, descricao, preco, foto, categoria_id, estabelecimento_id } = body;

      if (!nome || !preco) {
        return res.status(400).json({ error: 'Campos "nome" e "preco" são obrigatórios.' });
      }

      const created = await prisma.produtos.create({
        data: {
          nome,
          descricao: descricao || null,
          preco,
          foto: foto || null,
          categoria_id: categoria_id || null,
          estabelecimento_id: estabelecimento_id || null
        }
      });

      return res.status(201).json(created);
    }

    // 🔍 SE FOR VÁRIOS PRODUTOS (ARRAY)
    const produtos = body.map(item => {
      if (!item.nome || !item.preco) {
        throw new Error('Cada produto deve ter os campos "nome" e "preco".');
      }
      return {
        nome: item.nome,
        descricao: item.descricao || null,
        preco: item.preco,
        foto: item.foto || null,
        categoria_id: item.categoria_id || null,
        estabelecimento_id: item.estabelecimento_id || null
      };
    });

    const createdMany = await prisma.produtos.createMany({
      data: produtos,
      skipDuplicates: true
    });

    return res.status(201).json({
      message: "Produtos cadastrados com sucesso!",
      totalCadastrados: createdMany.count
    });

  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }
};

module.exports = addProduto;
