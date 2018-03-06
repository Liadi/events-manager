module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userFirstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 30],
          msg: 'invalid input, first name should have 2-30 letters only',
        },
      },
    },

    userLastName: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [2, 30],
          msg: 'invalid input, last name should have 2-30 letters only',
        },
      },
    },

    userEmail: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: 'invalid input, email is incorrect',
        },
      },
    },

    userPassword: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        len: {
          args: [6],
          msg: 'Password should have minimum of 6 characters'
        },
      },
    },

    userPhoneNumber: {
      type: DataTypes.STRING,
    },

    userType: {
      type: DataTypes.ENUM('admin', 'regular'),
      defaultValue: 'regular',
    },

  });

  User.associate = (models) => {
    User.hasMany(models.Event, {
      foreignKay: 'userId',
      as: 'events',
    });
  };

  return User;
};
