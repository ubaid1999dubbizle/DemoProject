'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class replythread extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      replythread.belongsTo(models.comment, {
        foreignKey: 'commentId',
        as: 'comment',
      })
  
      replythread.belongsTo(models.user, {
        foreignKey: 'userId',
        as: 'user',
      })

    }
  }
  replythread.init({
    commentId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    content: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'replythread',
  });
  return replythread;
};