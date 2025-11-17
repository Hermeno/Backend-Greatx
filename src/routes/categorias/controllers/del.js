const categoriaService = require('./categoriaService');

async function del(req, res) {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ error: 'ID inválido.' });

  try {
    await categoriaService.delete(id);
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = del;
