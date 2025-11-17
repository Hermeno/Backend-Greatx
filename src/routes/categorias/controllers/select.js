const categoriaService = require('./categoriaService');

async function getAll(req, res) {
  try {
    const categorias = await categoriaService.getAll();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


async function getById(req, res) {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ error: 'ID inválido.' });

  try {
    const categoria = await categoriaService.getById(id);
    if (!categoria) return res.status(404).json({ error: 'Categoria não encontrada.' });
    res.json(categoria);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { getAll, getById };
