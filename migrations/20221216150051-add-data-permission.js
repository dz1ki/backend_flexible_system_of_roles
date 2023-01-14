"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
    INSERT INTO "permissions" ( object_id, name, action, created_at, updated_at) VALUES
      ( 1, 'Update user role', 'Update', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ( 1, 'Read user role', 'Read', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ( 2, 'Read user first name', 'Read', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ( 3, 'Read user last name', 'Read', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ( 4, 'Read user email', 'Read', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ( 5, 'Read role', 'Read', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ( 5, 'Update role', 'Update', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ( 5, 'Create role', 'Create', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ( 5, 'Delete role', 'Delete', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ( 6, 'Read Role permissions', 'Read', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ( 6, 'Update Role permissions', 'Update', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ( 7, 'Read permissions name', 'Read', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
     

  `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`DELETE FROM "permissions"`);
  },
};
