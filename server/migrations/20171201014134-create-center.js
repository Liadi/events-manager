module.exports = {

  up: (queryInterface, Sequelize) => queryInterface.createTable('Centers', {
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

    centerCountry: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    centerState: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    centerCity: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    centerDescription: {
      type: Sequelize.TEXT,
    },

    centerMantra: {
      type: Sequelize.STRING,
    },

    centerCapacity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

    centerRate: {
      type: Sequelize.DECIMAL,
      allowNull: false,
    },

    centerStatus: {
      type: Sequelize.ENUM('available', 'unavailable'),
      defaultValue: 'available',
    },

    centerAmenitites: {
      type: Sequelize.TEXT,
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

  down: queryInterface => queryInterface.dropTable('Centers'),
};
