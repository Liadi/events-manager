module.exports = (sequelize, DataTypes) => {
  const Center = sequelize.define('Center', {

    centerName: {
      type: DataTypes.STRING,
      validate: {
        notNull: {
          args: true,
          msg: 'invalid input, center name should not be null',
        },
        len: {
          args: [1, 30],
          msg: 'invalid input, center name should be of length 1-30',
        },
      },
    },

    centerAddress: {
      type: DataTypes.STRING,
      validate: {
        notNull: {
          args: true,
          msg: 'invalid input, center arddress should not be null',
        },
        len: {
          args: [0, 120],
          msg: 'invalid input, center addrress should not be more than 120 characters',
        },
      },
    },

    centerCountry: {
      type: DataTypes.STRING,
      validate: {
        notNull: {
          args: true,
          msg: 'invalid input, center country should not be null',
        },
      },
    },

    centerState: {
      type: DataTypes.STRING,
      validate: {
        notNull: {
          args: true,
          msg: 'invalid input, center state should not be null',
        },
      },
    },

    centerCity: {
      type: DataTypes.STRING,
      validate: {
        notNull: {
          args: true,
          msg: 'invalid input, center city should not be null',
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
          args: [0, 50],
          msg: 'invalid input, center mantra should be more than 50 characters',
        },
      },
    },

    centerCapacity: {
      type: DataTypes.INTEGER,
      validate: {
        notNull: {
          args: true,
          msg: 'invalid input, center capacity should not be null',
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
      type: DataTypes.DECIMAL,
      validate: {
        notNull: {
          args: true,
          msg: 'invalid input, center rate should not be null',
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

    centerAmenitites: {
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
