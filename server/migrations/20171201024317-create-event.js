module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Events', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    eventName: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    eventStatus: {
      type: Sequelize.ENUM('upcoming', 'successful', 'cancelled'),
      defaultValue: 'upcoming',
    },

    eventAmountPaid: {
      type: Sequelize.DECIMAL,
      defaultValue: 0,
    },

    eventTime: {
      type: Sequelize.DATE,
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
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Centers',
        key: 'id',
        as: 'centerId',
      },
    },

    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id',
        as: 'userId',
      },
    },

  }),

  down: queryInterface => queryInterface.dropTable('Events'),
};
