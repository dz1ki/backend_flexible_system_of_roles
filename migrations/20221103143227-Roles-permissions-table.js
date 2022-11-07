"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Roles_permissions", {
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
      permission_id: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        isNullable: false,
        references: {
          model: "Permissions",
          key: "id",
          as: "permission_id",
        },
      },
    });
    await queryInterface.addConstraint("Roles_permissions", {
      type: "UNIQUE",
      name: "role_id_permission_id_unique",
      fields: ["role_id", "permission_id"],
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "Roles_permissions",
      "role_id_permission_id_unique"
    );
    await queryInterface.dropTable("Roles_permissions");
  },
};
