"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
    INSERT INTO "permission_objects" (id, name, slugname, is_system, created_at, updated_at) VALUES
      (1, 'User role', 'users.roles', true,  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      (2, 'User First name', 'users.firstName', true,  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)


  `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`DELETE FROM "permission_objects"`);
  },
};
