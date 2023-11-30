'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      comment.belongsTo(models.user, {
        foreignKey: 'commentorID',
        as: 'user',
      })

      comment.belongsTo(models.post, {
        foreignKey: 'postId',
        as: 'post',
      })

    }
  }
  comment.init({
    commentorID: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
    content: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'comment',
  });
  return comment;
};