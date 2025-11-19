require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./src/config/database');

const authRoutes = require('./src/routes/auth.routes');
const metaRoutes = require('./src/routes/meta.routes');
const autoavaliacaoRoutes = require('./src/routes/autoavaliacao.routes');
const relatorioRoutes = require('./src/routes/relatorio.routes');
const conteudoRoutes = require('./src/routes/conteudo.routes');
const suporteRoutes = require('./src/routes/suporte.routes');

const { User, Meta, Autoavaliacao, Relatorio, Conteudo, Suporte } = require('./src/models');

const app = express();
const PORT = process.env.PORT || 3333;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/metas', metaRoutes);
app.use('/api/autoavaliacoes', autoavaliacaoRoutes);
app.use('/api/relatorios', relatorioRoutes); 
app.use('/api/conteudos', conteudoRoutes);
app.use('/api/suportes', suporteRoutes);

async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexão com o Banco de Dados estabelecida com sucesso.');

    await sequelize.sync();
    console.log('✅ Modelos sincronizados com o Banco de Dados.');

    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Não foi possível conectar ao Banco de Dados:', error.message);
    process.exit(1);
  }
}

connectToDatabase();
