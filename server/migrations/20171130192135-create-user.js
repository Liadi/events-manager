module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      userFirstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      userLastName: {
        type: Sequelize.STRING,
      },

      userEmail: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      userPassword: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      userPhoneNumber: {
        type: Sequelize.STRING,
      },

      userType: {
        type: Sequelize.ENUM('admin', 'regular'),
        defaultValue: 'regular',
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }),

  down: queryInterface => queryInterface.dropTable('Users'),
};
