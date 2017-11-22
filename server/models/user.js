module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userFirstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userLastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userPassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userPhone: {
      type: DataTypes.STRING,
    },
    userStatus: {
      type: DataTypes.STRING,
      defaultValue: 'regular',
    },
  });
  User.associate = (models) => {
    User.hasMany(models.Event, {
      foreignKey: 'userId',
      as: 'events',
    });
  };
  return User;
};
