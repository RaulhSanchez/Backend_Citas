'use strict';

module.exports = {

    up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      id: 1,
      name: 'Paco',
      lastName: 'Porras',
      mail: 'demo@demo.com',
      password: "$10$zT.ryA.U0TmKPy0iiwbec.wcxRvVzwy6PMvIxGypYrYRPwRcmR2JG",
      phone: 678678678,
      role: 'admin',
      age: 34,
      address: "Calle Falsa 123",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
}