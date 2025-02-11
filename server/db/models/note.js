'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Note extends Model {
    static associate({ Notebook, User }) {
      this.belongsTo(Notebook, { foreignKey: 'notebookId' });
      this.belongsTo(User, { foreignKey: 'userId' });
    }
  }
  Note.init(
    {
      title: DataTypes.STRING,
      body: DataTypes.STRING,
      notebookId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      tags: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Note',
    },
  );
  return Note;
};
