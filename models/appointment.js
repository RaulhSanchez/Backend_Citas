'use strict';
const {
  Model
} = require('sequelize');
// const {user}=require('./index')
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Appointment.belongsTo(models.User, { // un usario se puede replicar muchas veces
        foreignKey: 'userId',
      });
    };
  };
  Appointment.init({
    date: DataTypes.STRING,
    state: DataTypes.STRING,
    
  }, {
    sequelize,
    modelName: 'Appointment',
  });
  return Appointment;
};