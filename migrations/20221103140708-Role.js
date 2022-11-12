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
        isNullable: false,
      },
      slugname: {
        type: Sequelize.STRING,
        isNullable: false,
      },
      is_system: {
        type: Sequelize.BOOLEAN,
        isNullable: false,
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
