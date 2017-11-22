module.exports = (sequelize, DataTypes) => {
  const EventItem = sequelize.define('Event', {
    eventName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    eventStartTime: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    eventEndTime: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    eventStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'upcoming',
    },
    eventServices: {
      type: DataTypes.TEXT,
    },
  });
  EventItem.associate = (models) => {
    // associations can be defined here
    EventItem.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    EventItem.belongsTo(models.Center, {
      foreignKey: 'centerId',
      onDelete: 'CASCADE',
    });
  };
  return EventItem;
};
