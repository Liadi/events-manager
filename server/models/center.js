module.exports = (sequelize, DataTypes) => {
  const Center = sequelize.define('Center', {
    centerName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 30],
        msg: 'The center name should be between range(1-30)',
      },
    },
    centerCountry: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Nigeria',
      validate: {
        len: {
          args: [1, 30],
          msg: 'The country name length should be between range(1-30)',
        },
      },
    },
    centerState: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 30],
          msg: 'The state name length should be between range(1-30)',
        },
      },
    },
    centerCity: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len:{ 
          args: [1, 30],
          msg: 'The city name length should be between range(1-30)'
        },
      },
    },
    centerCapacity: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        min: {
          args: 10,
          msg: 'center capacity should not be less than 10',
        },
        max: {
          args: 1000000000,
          msg: 'center capacity should not be more than a billion',
        },
      },
    },
    centerPrice: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: {
          args: 10,
          msg: 'price rate should not be less than 500 naira',
        },
        max: {
          args: 1000000000000,
          msg: 'price rate should not be more than a trillion naira',
        },
      },

    },
    centerStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'available',
      validate: {
        isEnum(value){
          if (value != 'available' && value != 'unavailable'){
            throw new Error('Status can be available or unavailable');
          }
        }

      },
    },
    centerAmenities: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    centerDescription: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
  Center.associate = (models) => {
    // associations can be defined here
    Center.hasMany(models.Event, {
      foreignKey: 'centerId',
      as: 'events',
    });
    Center.hasMany(models.Image, {
      foreignKey: 'centerId',
      as: 'images',
    });
  };
  return Center;
};
