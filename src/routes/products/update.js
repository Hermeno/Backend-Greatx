const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const toInt = (val) => {
  const parsed = parseInt(val, 10);
  return isNaN(parsed) ? null : parsed;
};

const updateProduto = async (req, res) => {
  const id = toInt(req.params.id);
  if (!id) return res.status(400).json({ error: 'ID inválido.' });

  try {
    const {nome,descricao,preco,foto,categoria_id,estabelecimento_id} = req.body;
    const updated = await prisma.produtos.update({
      where: { id },
      data: { nome: nome || undefined, descricao: descricao !== undefined ? descricao : undefined, preco: preco !== undefined ? preco : undefined, foto: foto !== undefined ? foto : undefined, categoria_id: categoria_id !== undefined ? categoria_id : undefined, estabelecimento_id: estabelecimento_id !== undefined ? estabelecimento_id : undefined}
    });

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = updateProduto;
