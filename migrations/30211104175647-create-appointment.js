'use strict';
const { sequelize } = require("../models");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Appointments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING  
      },
      userId:{ 
        type: Sequelize.INTEGER,
        references:{
          model: {
            tableName: 'users'
          },
          key: 'id'
        }
      },
      doctorId:{ 
        type: Sequelize.INTEGER,
        references:{
          model: {
            tableName: 'doctors'
          },
          key: 'id'
        }
      },
      petId:{ 
        type: Sequelize.INTEGER,
        references:{
          model: {
            tableName: 'pets'
          },
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Appointments');
  }
};