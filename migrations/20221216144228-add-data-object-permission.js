"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
    INSERT INTO "permission_objects" (id, name, slugname, is_system, created_at, updated_at) VALUES
      (1, 'Permission', 'permissions', true,  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      (2, 'Permission Object', 'permission_objects', true , CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      (3, 'Role', 'roles', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      (4, 'User', 'users' , true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)

  `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`DELETE FROM "permission_objects"`);
  },
};
