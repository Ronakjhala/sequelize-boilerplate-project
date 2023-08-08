'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.renameColumn('Port', 'firstName', 'name');
},

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Port');
  },
};