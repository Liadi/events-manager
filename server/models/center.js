module.exports = (sequelize, DataTypes) => {
  const Center = sequelize.define('Center', {
    centerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    centerAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    centerCapacity: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    centerPrice: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    centerStatus: {
      type: DataTypes.STRING,
      allowNull: false
    },
    centerAmenities: {
      type: DataTypes.STRING,
      allowNull: false
    },
    centerDescription: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    centerImage: {
      type: DataTypes.STRING,
    }
  });
  Center.associate = (models) => {
    // associations can be defined here
    Center.hasMany(models.Event, {
      foreignKey: 'centerId',
      as: 'events',
    });
  };
  return Center;
};
