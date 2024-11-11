const mongoose = require('mongoose');

const db = (PORT) => {
  mongoose.connect('mongodb://localhost:27017/BUSAPP', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Conectado ao MongoDB');
  })
  .catch((err) => {
    console.error('Erro de conexão com o MongoDB:', err);
  });
};

module.exports = db;