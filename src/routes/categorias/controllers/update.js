const categoriaService = require('./categoriaService');

async function update(req, res) {
  const id = parseInt(req.params.id, 10);
  const { nome } = req.body;

  if (isNaN(id)) return res.status(400).json({ error: 'ID inválido.' });
  if (!nome) return res.status(400).json({ error: 'Campo "nome" é obrigatório.' });

  try {
    const categoria = await categoriaService.update(id, nome);
    res.json(categoria);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = update;
