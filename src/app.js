const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const express = require('express');
const auth = require('./auth');
const usuariosInternosRoutes = require('./routes/usuariosInternos');
const errorHandler = require('./middlewareError');

class AppServer {
  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.middlewares();
  }

  config() {
    this.app.use(express.json());
  }

  routes() {
    // Public orders endpoint for mobile app to submit orders
    this.app.use('/orders', require('./routes/orders/orders'));
    this.app.use('/usuarios-internos', usuariosInternosRoutes);
    const authMiddleware = require('./auth');

    this.app.use('/clientes', require('./routes/clientes/clientes'));
    this.app.use('/categorias', authMiddleware, require('./routes/categorias/categorias'));
    this.app.use('/pedidos',authMiddleware, require('./routes/pedidos/pedidos'));
    this.app.use('/produtos',authMiddleware, require('./routes/products/produtos'));
    this.app.use('/estabelecimentos',authMiddleware, require('./routes/estabelecimentos/estabelecimentos'));
    this.app.use('/historicoBenefios',authMiddleware, require('./routes/historicoBeneficios/historicoBeneficios'));
    this.app.use('/historicosRelatorio',authMiddleware, require('./routes/historicosRelatorio/historicoRelatorios'));
    this.app.use('/itensPedido',authMiddleware, require('./routes/itens/itens'));
    this.app.use('/mesas',authMiddleware, require('./routes/mesas/mesas'));
    this.app.use('/monitoramento',authMiddleware, require('./routes/monitoramento/monitoramentoSistema'));
    this.app.use('/payment',authMiddleware, require('./routes/payment/pagamentos'));

    this.app.use('/auth', auth); 
  }
  middlewares() {
    this.app.use(errorHandler);
  }




  start() {
    const PORT = process.env.PORT || 3000;
    this.app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }
}

const server = new AppServer();
server.start();
