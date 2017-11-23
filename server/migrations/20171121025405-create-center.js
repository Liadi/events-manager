module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('Centers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      centerName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      centerAddress: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      centerCapacity: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      centerPrice: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      centerStatus: {
        type: Sequelize.STRING,
        allowNull: false
      },
      centerAmenities: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      centerDescription: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      centerImage: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface) => {
    queryInterface.dropTable('Centers');
  },
};
