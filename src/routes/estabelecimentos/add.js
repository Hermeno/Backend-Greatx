const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
// multer
// import multer from 'multer';
// const upload = multer({ dest: 'uploads/' });

// make upload middleware available

// const uploadMiddleware = upload.single('foto');

// export route handler with upload middleware




module.exports = async (req, res) => {
  const { cliente_id, nome, foto,  endereco, tipo } = req.body;

  if (!nome) {
    return res.status(400).json({ error: 'Campo "nome" é obrigatório.' });
  }

  try {
    const created = await prisma.estabelecimentos.create({
      data: { cliente_id, nome, foto, endereco, tipo }
    });
    res.status(201).json(created);
  } catch (error) {
    // rethrow the original error so asyncHandler / error middleware can handle it
    throw error;
  }
};
