"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
    INSERT INTO "roles_permissions" (id, role_id, permission_id, is_system, created_at, updated_at) VALUES
      (1, 1, 1, true,  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      (2, 1, 2, true,  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
  `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`DELETE FROM "roles_permissions"`);
  },
};
