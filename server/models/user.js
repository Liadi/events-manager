module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userFirstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /^[a-z]+$/i,
          msg: 'invalid input, first name should be letters only',
        },
        len: {
          args: [2, 30],
          msg: 'invalid input, first name should have 2-30 letters only',
        },
      },
    },

    userLastName: {
      type: DataTypes.STRING,
      validate: {
        is: {
          args: /^[a-z]+$/i,
          msg: 'invalid input, last name should be letters only',
        },
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
