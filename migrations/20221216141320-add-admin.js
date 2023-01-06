"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
    INSERT INTO "users" (id, first_name, last_name, email, mail_confirmation_code, password, email_confirmed, is_system, created_at, updated_at) VALUES
      (1, 'Admin', 'admin', 'admin@example.com', 'dsa', '$2b$05$wCu1.kFpPoV.n8Ea5Muzie7nwzmKiqt58jng0EH9EVDIT6QaaZXaC', true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
  `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`DELETE FROM "users"`);
  },
};
