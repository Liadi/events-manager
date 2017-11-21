module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    imageType: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'main',
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Image.associate = (models) => {
    // associations can be defined here
    Image.belongsTo(models.Center, {
      foreignKey: 'imageId',
      onDelete: 'CASCADE',
    });
  };
  return Image;
};
