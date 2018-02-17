'use strict';
module.exports = (sequelize, DataTypes) =>  {
  const Log = sequelize.define('Log', {
      entityName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      entity: {
        type: DataTypes.ENUM('User', 'Center', 'Event'),
        allowNull: false,
      },
      entityId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      action: {
        type: DataTypes.ENUM('POST', 'UPDATE', 'DELETE'),
        allowNull: false,
      },
      before: {
        allowNull: false,
        type: DataTypes.TEXT('long'),
      },
      after: {
        allowNull: false,
        type: DataTypes.TEXT('long'),
      },
  });

  Log.associate = (models) => {
    Log.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };

  return Log;
};