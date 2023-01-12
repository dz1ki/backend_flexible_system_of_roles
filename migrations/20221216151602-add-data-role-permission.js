"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
    INSERT INTO "roles_permissions" (id, role_id, permission_id, is_system, created_at, updated_at) VALUES
      (1, 1, 1, true,  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      (2, 1, 2, true,  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      (3, 1, 3, true,  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      (4, 1, 4, true,  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      (5, 1, 5, true,  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      (6, 1, 6, true,  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      (7, 1, 7, true,  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      (8, 1, 8, true,  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      (9, 1, 9, true,  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      (10, 1, 10, true,  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      (11, 1, 11, true,  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      (12, 1, 12, true,  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      (13, 2, 3, true,  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      (14, 2, 4, true,  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      (15, 2, 5, true,  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
  `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`DELETE FROM "roles_permissions"`);
  },
};
