"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
    INSERT INTO "permissions" (id, object_id, name, action, is_system, created_at, updated_at) VALUES
      (1, 1, 'Create permission', 'Create', true,  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      (2, 1, 'Update permission', 'Update', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      (3, 1, 'Read permission', 'Read', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      (4, 1, 'Delete permission', 'Delete', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      (5, 2, 'Create Permission Object', 'Create', true,  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      (6, 2, 'Update Permission Object', 'Update', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      (7, 2, 'Read Permission Object', 'Read', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      (8, 2, 'Delete Permission Object', 'Delete', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      (9, 3, 'Create Role', 'Create', true,  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      (10, 3, 'Update Role', 'Update', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      (11, 3, 'Read Role', 'Read', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      (12, 3, 'Delete Role', 'Delete', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)

  `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`DELETE FROM "permissions"`);
  },
};
