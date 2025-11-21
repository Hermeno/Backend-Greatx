const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const addPedido = async (req, res) => {
  try {
    const clienteId = req.userId || null;
    if (!clienteId) return res.status(401).json({ error: 'Usuário não autenticado' });

    const cliente = await prisma.clientes.findUnique({ where: { id: clienteId } });
    if (!cliente) return res.status(404).json({ error: 'Cliente não encontrado' });

    const { itensPedido } = req.body;
    if (!Array.isArray(itensPedido) || itensPedido.length === 0) {
      return res.status(400).json({ error: 'Nenhum item no pedido' });
    }

    const produtoIds = itensPedido.map(item => item.produto_id);
    const produtos = await prisma.produtos.findMany({ where: { id: { in: produtoIds } } });

    const itensParaCriar = itensPedido.map(item => {
      const produto = produtos.find(p => p.id === item.produto_id);
      if (!produto) throw new Error(`Produto ${item.produto_id} não encontrado`);
      return { produto_id: item.produto_id, quantidade: item.quantidade, preco_unitario: produto.preco };
    });

    const total = itensParaCriar.reduce(
      (acc, item) => acc + Number(item.preco_unitario) * item.quantidade,
      0
    );

    const pedidoCriado = await prisma.pedidos.create({
      data: {
        cliente_id: clienteId,
        status: 'aberto',
        total,
        itensPedido: { create: itensParaCriar },
      },
      include: { itensPedido: true },
    });

    res.status(201).json(pedidoCriado);
  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = addPedido;
