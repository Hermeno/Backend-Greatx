const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';


const router = express.Router();

async function loginClientes(req, res) {
    try {
        const userInfo = req.body;
        const user = await prisma.clientes.findUnique({
            where: {
                email: userInfo.email,
            },
        });
        if (!user) {
            return res.status(401).json({ error: 'E-mail ou senha inválidos' });
        }
        const isMatch = await bcrypt.compare(userInfo.senha, user.senha);
        if (!isMatch) {
            return res.status(401).json({ error: 'E-mail ou senha inválidos' });
        }
        const token = jwt.sign({ id: user.id, user: user.nome, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(401).json({ error: 'E-mail ou senha inválidos' });
    }
} 

module.exports = loginClientes;