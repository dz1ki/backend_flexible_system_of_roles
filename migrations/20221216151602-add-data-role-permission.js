"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
    INSERT INTO "roles_permissions" (id, role_id, permission_id, created_at, updated_at) VALUES
      (1, 1, 1,  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      (2, 1, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      (3, 1, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      (4, 1, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      (5, 1, 5,  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      (6, 1, 6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      (7, 1, 7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      (8, 1, 8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      (9, 1, 9,  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      (10, 1, 10, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      (11, 1, 11, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      (12, 1, 12, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)

  `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`DELETE FROM "roles_permissions"`);
  },
};
