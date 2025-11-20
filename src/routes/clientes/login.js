const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

async function loginClientes(req, res) {
    try {
        const { email, senha } = req.body;

        const user = await prisma.clientes.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(401).json({ error: 'E-mail ou senha inválidos' });
        }

        const isMatch = await bcrypt.compare(senha, user.senha);
        if (!isMatch) {
            return res.status(401).json({ error: 'E-mail ou senha inválidos' });
        }

        // Gerar token corretamente
        const token = jwt.sign(
            { id: user.id, nome: user.nome, email: user.email },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        console.log("Usuário autenticado:", user.email);

        return res.status(200).json({
            token,
            usuario: {
                id: user.id,
                nome: user.nome,
                email: user.email,
            },
        });

    } catch (error) {
        console.error("Erro no login:", error);
        return res.status(500).json({ error: 'Erro interno no servidor' });
    }
}

module.exports = loginClientes;
