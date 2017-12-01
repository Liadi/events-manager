module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {

    eventName: {
      type: DataTypes.STRING,
      validate: {
        notNull: {
          args: true,
          msg: 'invalid input, event name should not be null',
        },
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
      validate: {
        notNull: {
          args: true,
          msg: 'invalid input, event start time should not be null',
        },
      },
    },

    eventEndTime: {
      type: DataTypes.STRING,
      validate: {
        notNull: {
          args: true,
          msg: 'invalid input, event end time should not be null',
        },
      },
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
