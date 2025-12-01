
require('dotenv').config();
const { OpenAI } = require("openai");
const express = require('express');
const cors = require('cors');
const sequelize = require('./src/config/database');

const authRoutes = require('./src/routes/auth.routes');
const metaRoutes = require('./src/routes/meta.routes');
const autoavaliacaoRoutes = require('./src/routes/autoavaliacao.routes');
const relatorioRoutes = require('./src/routes/relatorio.routes');
const conteudoRoutes = require('./src/routes/conteudo.routes');
const suporteRoutes = require('./src/routes/suporte.routes');
const chatgptRoutes = require('./src/routes/chatgpt.routes');

const { User, Meta, Autoavaliacao, Relatorio, Conteudo, Suporte } = require('./src/models');

const chatGptClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const app = express();
const PORT = process.env.PORT || 3333;

// process.env.NODE_ENV = 'production';

app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/metas', metaRoutes);
app.use('/api/autoavaliacoes', autoavaliacaoRoutes);
app.use('/api/relatorios', relatorioRoutes); 
app.use('/api/conteudos', conteudoRoutes);
app.use('/api/suportes', suporteRoutes);
app.use('/api/chatgpt', chatgptRoutes(chatGptClient)); //inicia chatGptClient apenas uma vez e injeta aqui

async function runMigrations() {
  try {
    const path = require('path');
    const fs = require('fs');
    const migrationsPath = path.join(__dirname, 'src', 'migrations');
    
    if (!fs.existsSync(migrationsPath)) {
      return;
    }

    // Cria tabela de controle de migrations se não existir
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS SequelizeMeta (
        name VARCHAR(255) NOT NULL PRIMARY KEY
      )
    `).catch(() => {});

    // Busca migrations já executadas
    const [executedMigrations] = await sequelize.query(`
      SELECT name FROM SequelizeMeta
    `).catch(() => [[]]);
    
    const executedNames = executedMigrations.map(m => m.name);

    // Lista todos os arquivos de migration
    const migrationFiles = fs.readdirSync(migrationsPath)
      .filter(file => file.endsWith('.js') && file !== 'rename-meta-userid-to-usuario-id.js')
      .sort();

    // Executa migration de renomeação de coluna se ainda não foi executada
    const renameMigrationName = 'rename-meta-userid-to-usuario-id';
    if (!executedNames.includes(renameMigrationName)) {
      try {
        const renameMigration = require(path.join(migrationsPath, 'rename-meta-userid-to-usuario-id.js'));
        await renameMigration.up(sequelize.getQueryInterface(), sequelize.constructor);
        
        // Registra migration como executada
        await sequelize.query(`
          INSERT INTO SequelizeMeta (name) VALUES ('${renameMigrationName}')
        `).catch(() => {});
        
        console.log('✅ Migration de renomeação de coluna executada.');
      } catch (error) {
        // Se a coluna já foi renomeada ou não existe, apenas registra
        console.log('ℹ️  Migration de renomeação: ' + (error.message.includes('Unknown column') ? 'Coluna já renomeada ou não existe' : error.message));
        await sequelize.query(`
          INSERT INTO SequelizeMeta (name) VALUES ('${renameMigrationName}')
        `).catch(() => {});
      }
    }
  } catch (error) {
    console.log('⚠️  Aviso ao executar migrations:', error.message);
  }
}



async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexão com o Banco de Dados estabelecida com sucesso.');

    // Executa migrations antes de sincronizar
    await runMigrations();

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
