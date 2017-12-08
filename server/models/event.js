module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {

    eventName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [0, 120],
          msg: 'invalid input, event name should have at most 120 characters',
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
          args: [0],
          msg: 'invalid input, amount paid should be percentage value only [0 - 100]',
        },
        max: {
          args: [100],
          msg: 'invalid input, amount paid should be percentage value only [0 - 100]',
        },
      },
    },

    eventTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    centerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Event.associate = (models) => {
    Event.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });

    Event.belongsTo(models.Center, {
      as: 'center',
      foreignKey: 'centerId',
      onDelete: 'CASCADE',
    });
  };

  return Event;
};
