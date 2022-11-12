"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
    INSERT INTO "roles" (id, name, slugname, is_system, created_at, updated_at) VALUES
      (1, 'Admin', 'admin', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      (2, 'User', 'user', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
  `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`DELETE FROM "roles"`);
  },
};
