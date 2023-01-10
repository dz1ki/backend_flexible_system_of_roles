"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      first_name: {
        type: Sequelize.STRING,
      },

      last_name: {
        type: Sequelize.STRING,
      },

      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      mail_confirmation_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      email_confirmed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },

      is_system: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },

      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },

      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
