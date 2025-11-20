const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


module.exports = async (req, res) => {
    try {
        const data = req.body;
        const getMany = await prisma.itensPedido.findMany({ where: data });
        res.status(201).json(getMany);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// getById

 module.exports = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const getById = await prisma.itensPedido.findUnique({ where: { id } });
        res.status(201).json(getById);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};  