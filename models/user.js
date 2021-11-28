'use strict';


const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      User.hasMany(models.Appointment, {
        foreignKey: 'userId',
      });
    };
  };

  User.init({
    name: DataTypes.STRING,
    lastname: DataTypes.STRING,
    mail: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validation: {
        isEmail: true,
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: DataTypes.FLOAT,
    role: DataTypes.STRING,
    age: DataTypes.STRING,
    adress: DataTypes.STRING

  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};