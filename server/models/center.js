module.exports = (sequelize, DataTypes) => {
  const Center = sequelize.define('Center', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Nigeria',
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capacity: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'available',
    },
    amenities: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
  Center.associate = (models) => {
    // associations can be defined here
    Center.hasMany(models.Event, {
      foreignKey: 'eventId',
      as: 'events',
    });
    Center.hasMany(models.Image, {
      foreignKey: 'imageId',
      as: 'images',
    });
  };
  return Center;
};
