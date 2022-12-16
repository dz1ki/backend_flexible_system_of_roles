"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
    INSERT INTO "permission_objects" (id, name, slugname, is_system, created_at, updated_at) VALUES
      (1, 'Permission', 'permission', true,  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      (2, 'Permission Object', 'permission_object', true , CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      (3, 'Role', 'role', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
  `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`DELETE FROM "permission_objects"`);
  },
};
