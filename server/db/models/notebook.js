'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notebook extends Model {
    static associate({ Note, User }) {
      this.hasMany(Note, { foreignKey: 'notebookId' });
      this.belongsTo(User, { foreignKey: 'userId' });
    }
  }
  Notebook.init(
    {
      title: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Notebook',
    },
  );
  return Notebook;
};
