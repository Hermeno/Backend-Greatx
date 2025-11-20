const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        const deleted = await prisma.itensPedido.delete({
            where: { id },
        });
        res.json(deleted);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};