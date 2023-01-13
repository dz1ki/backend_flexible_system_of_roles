"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
    INSERT INTO "roles" ( name, is_system, created_at, updated_at) VALUES
      ( 'Admin', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ( 'User', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
  `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`DELETE FROM "roles"`);
  },
};
