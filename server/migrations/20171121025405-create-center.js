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
      centerCountry: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Nigeria',
      },
      centerState: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      centerCity: {
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
        defaultValue: 'available',
        allowNull: false,
      },
      centerAmenities: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      centerDescription: {
        type: Sequelize.TEXT,
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
    });
  },
  down: (queryInterface) => {
    queryInterface.dropTable('Centers');
  },
};
