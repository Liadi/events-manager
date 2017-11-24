module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    eventName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    eventTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    eventStatus: {
      type: DataTypes.STRING,
      defaultValue: 'upcoming',
    },
    eventServices: {
      type: DataTypes.TEXT,
    },
  });
  Event.associate = (models) => {
    // associations can be defined here
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
