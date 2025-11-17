// src/middlewares/errorHandler.js
function errorHandler(err, req, res, next) {
  console.error(err);

  // Erro de unique constraint (ex: email duplicado)
  if (err.code === 'P2002') {
    return res.status(400).json({ error: 'Valor único já existe no banco de dados.' });
  }

  // Registro não encontrado
  if (err.code === 'P2025') {
    return res.status(404).json({ error: 'Registro não encontrado.' });
  }

  // Outros erros
  return res.status(500).json({ error: 'Erro interno do servidor', detalhe: err.message });
}

module.exports = errorHandler;
