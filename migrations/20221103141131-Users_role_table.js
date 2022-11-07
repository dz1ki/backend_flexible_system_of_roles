"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users_roles", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      role_id: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        isNullable: false,
        references: {
          model: "Roles",
          key: "id",
          as: "role_id",
        },
      },
      user_id: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        isNullable: false,
        references: {
          model: "Users",
          key: "id",
          as: "user_id",
        },
      },
    });
    await queryInterface.addConstraint("Users_roles", {
      type: "UNIQUE",
      name: "user_id_role_id_unique",
      fields: ["user_id", "role_id"],
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "Users_roles",
      "user_id_role_id_unique"
    );
    await queryInterface.dropTable("Users_roles");
  },
};
