'use strict';
const {Model} = require('sequelize');
// const {user}=require('./index')
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    static associate(models) {
      
      Appointment.belongsTo(models.User, { // un usario se puede replicar muchas veces
        foreignKey: 'userId',
      });
      Appointment.belongsTo(models.Doctor, { // un doctor se puede replicar muchas veces
        foreignKey: 'doctorId',
      })
      Appointment.belongsTo(models.Pet, { // un animal se puede replicar muchas veces
        foreignKey: 'petId',
      })
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