module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {

    eventName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [30],
          msg: 'invalid input, event name should have at most 30 characters',
        },
      },
    },

    eventStatus: {
      type: DataTypes.ENUM('upcoming', 'successful', 'cancelled'),
      defaultValue: 'upcoming',
    },

    eventAmountPaid: {
      type: DataTypes.DECIMAL,
      defaultValue: 0,
      validate: {
        is: {
          args: /^[0-9]+$/i,
          msg: 'invalid input, amount paid for event should be positive integers between 0 and 100 (percentage)',
        },
        min: {
          args: 0,
          msg: 'invalid input, percentage value only [0 - 100]',
        },
        max: {
          args: 100,
          msg: 'invalid input, percentage value only [0 - 100]',
        },
      },
    },

    eventStartTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    eventEndTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  });

  Event.associate = (models) => {
    Event.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });

    Event.belongsTo(models.Center, {
      foreignKey: 'centerId',
      onDelete: 'CASCADE',
    });
  };

  return Event;
};
