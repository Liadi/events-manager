module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('Images', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      imageType: {
        type: Sequelize.STRING,
        defaultValue: 'others',
      },
      imageDescription: {
        type: Sequelize.STRING,
        allowNull: false,
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
    });
  },
  down: (queryInterface /* , Sequelize */) => {
    queryInterface.dropTable('Images');
  },
};
