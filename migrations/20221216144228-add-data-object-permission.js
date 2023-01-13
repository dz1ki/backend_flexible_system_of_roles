"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
    INSERT INTO "permission_objects" ( name, slugname, created_at, updated_at) VALUES
      ( 'User role', 'users.roles',  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ( 'User First name', 'users.firstName',  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ( 'User Last name', 'users.lastName',  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ( 'User email', 'users.email',  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ( 'Role name', 'roles.role',  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ( 'Role permissions', 'roles.permissions',  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ( 'Permissions', 'permissions.name',  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)

  `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`DELETE FROM "permission_objects"`);
  },
};
