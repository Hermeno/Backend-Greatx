const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const addPedido = async (req, res) => {
  try {
    // Pega o usuário logado do token
    const userId = req.user.id;

    if (!userId) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    const { total, itensPedido } = req.body;

    if (!Array.isArray(itensPedido) || itensPedido.length === 0) {
      return res.status(400).json({ error: 'Nenhum item no pedido' });
    }

    // Cria pedido com itens em uma única transação
    const pedidoCriado = await prisma.pedidos.create({
      data: {
        usuario_final_id: userId,
        status: 'aberto',
        total: total ?? 0,
        itensPedido: {
          create: itensPedido.map((item) => ({
            produto_id: item.produto_id,
            quantidade: item.quantidade,
          })),
        },
      },
      include: {
        itensPedido: true, // inclui os itens do pedido no retorno
      },
    });

    res.status(201).json(pedidoCriado);
  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = addPedido;
