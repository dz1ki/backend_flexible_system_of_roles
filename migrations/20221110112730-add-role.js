"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
    INSERT INTO "roles" (id, name, is_system, created_at, updated_at) VALUES
      (1, 'Admin', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      (2, 'User', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
  `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`DELETE FROM "roles"`);
  },
};
