module.exports = (sequelize, DataTypes) => {
  const Center = sequelize.define('Center', {

    centerName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [0, 50],
          msg: 'invalid input, center name should not be more than 50 characters',
        },
      },
    },

    centerAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [0, 120],
          msg: 'invalid input, center addrress should not be more than 120 characters',
        },
      },
    },

    centerCountry: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [0, 50],
          msg: 'invalid input, center country should not be more than 50 characters',
        },
      },
    },

    centerState: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [0, 50],
          msg: 'invalid input, center state should not be more than 50 characters',
        },
      },
    },

    centerCity: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [0, 50],
          msg: 'invalid input, center city should not be more than 50 characters',
        },
      },
    },

    centerDescription: {
      type: DataTypes.TEXT,
    },

    centerMantra: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [0, 100],
          msg: 'invalid input, center mantra should not be more than 100 characters',
        },
      },
    },

    centerCapacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        is: {
          args: /^[0-9]+$/i,
          msg: 'invalid input, center capacity should be a positive whole number',
        },
        min: {
          args: 5,
          msg: 'invalid input, center capacity should not be less than five (5)',
        },
        max: {
          args: 1000000000,
          msg: 'invalid input, center capacity should not be more than a billion (1000000000)',
        },
      },
    },

    centerRate: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        is: {
          args: /^[0-9]+$/i,
          msg: 'invalid input, center rate should be a positive whole number',
        },
        min: {
          args: 500,
          msg: 'invalid input, center rate should not be less than five hundred naira (#500)',
        },
        max: {
          args: 1000000000,
          msg: 'invalid input, center rate should not be more than 1 billion naira (#1000000000)',
        },
      },
    },

    centerStatus: {
      type: DataTypes.ENUM('available', 'unavailable'),
      defaultValue: 'available',
    },

    centerAmenities: {
      type: DataTypes.TEXT,
    },

  });

  Center.associate = (models) => {
    Center.hasMany(models.Image, {
      foreignKey: 'centerId',
      as: 'images',
    });

    Center.hasMany(models.Event, {
      foreignKey: 'centerId',
      as: 'events',
    });
  };

  return Center;
};
