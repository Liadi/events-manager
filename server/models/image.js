module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {

    imagePath: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    imageDescription: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [0, 50],
          msg: 'invalid input, image description should not be more than 30 characters',
        },
      },
    },

    imageOrder: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        is: {
          args: /^[0-9]+$/i,
          msg: 'invalid input, image order should be positive integers',
        },
        min: {
          args: 0,
          msg: 'invalid input, negative image order not allowed',
        },
        max: {
          args: 20,
          msg: 'invalid input, image order above 20 is discouraged, as a workaround give multiple images same order, order range[0, 20]',
        },
      },
    },
    centerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Image.associate = (models) => {
    Image.belongsTo(models.Center, {
      foreignKey: 'centerId',
      onDelete: 'CASCADE',
    });
  };

  return Image;
};
