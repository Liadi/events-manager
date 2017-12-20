module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Images', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      imagePath: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      imageDescription: {
        type: Sequelize.STRING,
      },

      imageOrder: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },

      centerId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Centers',
          key: 'id',
          as: 'centerId',
        },
      },

    }),

  down: queryInterface => queryInterface.dropTable('Images'),

};
