'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class reaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      reaction.belongsTo(models.post, {
        foreignKey: 'postId',
        as: 'post',
      })

      reaction.belongsTo(models.user, {
        foreignKey: 'userId',
        as: 'user',
      })

    }
  }
  reaction.init({
    postId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    reaction: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'reactions',
  });
  return reaction;
};