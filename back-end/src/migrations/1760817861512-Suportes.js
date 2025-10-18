module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Suportes", {
      id: {
        type: Sequelize.INTEGER,

        allowNull: false,

        primaryKey: true,

        autoIncrement: true,
      },

      nome: {
        type: Sequelize.STRING,

        allowNull: false,
      },

      telefone: {
        type: Sequelize.STRING,

        allowNull: true,
      },

      link: {
        type: Sequelize.STRING,

        allowNull: true,
      },

      tipo: {
        type: Sequelize.ENUM( "apoio", "informativo", "emergencia" ),

        defaultValue: "apoio",
      },

      createdAt: {
        type: Sequelize.DATE,

        allowNull: false,
      },

      updatedAt: {
        type: Sequelize.DATE,

        allowNull: false,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("Suportes");
  },
};

