module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    imageType: {
      type: DataTypes.STRING,
      defaultValue: 'others',
    },
    imageDescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Image.associate = (models) => {
    // associations can be defined here
    Image.belongsTo(models.Center, {
      foreignKey: 'centerId',
      onDelete: 'CASCADE',
    });
  };
  return Image;
};
