'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pet extends Model {
    static associate(models) {
      // define association here
      Pet.belongsTo(models.User, { // un usario se puede replicar muchas veces
        foreignKey: 'userId',
      });
      Pet.hasMany(models.Appointment, {
        foreignKey: 'petId',
      });
    };
  };
  Pet.init({
    name: DataTypes.STRING,
    mascota: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pet',
  });
  return Pet;
};