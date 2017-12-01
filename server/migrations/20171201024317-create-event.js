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

    eventStartTime: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    eventEndTime: {
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

    eventId: {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Events',
        key: 'id',
        as: 'eventId',
      },
    },

  }),

  down: queryInterface => queryInterface.dropTable('Events'),
};
