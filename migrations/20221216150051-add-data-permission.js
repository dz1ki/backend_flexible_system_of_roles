"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
    INSERT INTO "permissions" (id, object_id, name, action, is_system, created_at, updated_at) VALUES
      (1, 1, 'Update user role', 'Update', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      (2, 2, 'Update user first name', 'Update', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)

  `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`DELETE FROM "permissions"`);
  },
};
