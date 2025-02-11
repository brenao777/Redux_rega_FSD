'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Note, Notebook }) {
      this.hasMany(Note, { foreignKey: 'userId', as: 'notes' });
      this.hasMany(Notebook, { foreignKey: 'userId', as: 'notebooks' });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
