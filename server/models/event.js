module.exports = (sequelize, DataTypes) => {
  const EventItem = sequelize.define('Event', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startTime: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    endTime: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'upcoming',
    },
    services: {
      type: DataTypes.TEXT,
    },
  });
  EventItem.associate = (models) => {
    // associations can be defined here
    EventItem.belongsTo(models.User, {
      foreignKey: 'eventId',
      onDelete: 'CASCADE',
    });
    EventItem.belongsTo(models.Center, {
      foreignKey: 'centerId',
      onDelete: 'CASCADE',
    });
  };
  return EventItem;
};
