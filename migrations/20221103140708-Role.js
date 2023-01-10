"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("roles", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      slugname: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      is_system: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },

      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        timestamps: false,
      },

      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        timestamps: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("roles");
  },
};
