"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
    INSERT INTO "permission_objects" (id, name, slugname, created_at, updated_at) VALUES
      (1, 'User role', 'users.roles',  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      (2, 'User First name', 'users.firstName',  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      (3, 'User Last name', 'users.lastName',  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      (4, 'User email', 'users.email',  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      (5, 'Role name', 'roles.name',  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      (6, 'Role permissions', 'roles.permissions',  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      (7, 'Permissions', 'permissions.name',  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)

  `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`DELETE FROM "permission_objects"`);
  },
};
