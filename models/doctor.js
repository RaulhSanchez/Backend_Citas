'use strict';


const {Model} = require('sequelize');



module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    static associate(models) {

      Doctor.belongsTo(models.User, { // un usario se puede replicar muchas veces
        foreignKey: 'userId',
      });
    }
  };
  Doctor.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Doctor',
  });
  return Doctor;
};