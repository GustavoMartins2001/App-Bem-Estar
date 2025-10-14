require('dotenv').config();
const express = require('express');
const cors = require('cors'); 
const sequelize = require('./src/config/database');
const authRoutes = require('./src/routes/auth.routes');
const User = require('./src/models/User'); 

const app = express();
const PORT = process.env.PORT || 3333;

app.use(cors({
  // Permite que o front-end (http://localhost:5173, por exemplo) se conecte
  origin: 'http://localhost:5173', 
})); 
app.use(express.json());

app.use('/api/auth', authRoutes);

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