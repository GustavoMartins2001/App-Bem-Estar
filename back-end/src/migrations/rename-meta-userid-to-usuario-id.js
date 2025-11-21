module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      const [results] = await queryInterface.sequelize.query(`
        SELECT COLUMN_NAME 
        FROM INFORMATION_SCHEMA.COLUMNS 
        WHERE TABLE_SCHEMA = DATABASE() 
        AND TABLE_NAME = 'Meta' 
        AND COLUMN_NAME = 'userId'
      `);

      if (results.length > 0) {
        await queryInterface.sequelize.query(`
          ALTER TABLE Meta CHANGE userId usuario_id INT
        `);
        console.log('✅ Coluna userId renomeada para usuario_id na tabela Meta');
      } else {
        console.log('ℹ️  Coluna userId não encontrada. Pode já ter sido renomeada ou não existir.');
      }
    } catch (error) {
      if (error.message.includes('Unknown column')) {
        console.log('ℹ️  Coluna userId não encontrada. Pode já ter sido renomeada.');
      } else {
        throw error;
      }
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      const [results] = await queryInterface.sequelize.query(`
        SELECT COLUMN_NAME 
        FROM INFORMATION_SCHEMA.COLUMNS 
        WHERE TABLE_SCHEMA = DATABASE() 
        AND TABLE_NAME = 'Meta' 
        AND COLUMN_NAME = 'usuario_id'
      `);

      if (results.length > 0) {
        await queryInterface.sequelize.query(`
          ALTER TABLE Meta CHANGE usuario_id userId INT
        `);
        console.log('✅ Coluna usuario_id renomeada de volta para userId na tabela Meta');
      }
    } catch (error) {
      console.log('⚠️  Erro ao reverter migration:', error.message);
    }
  },
};

