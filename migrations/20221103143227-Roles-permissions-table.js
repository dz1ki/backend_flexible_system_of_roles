"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("roles_permissions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      role_id: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        allowNull: false,
        references: {
          model: "roles",
          key: "id",
          as: "role_id",
        },
      },
      permission_id: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        allowNull: false,
        references: {
          model: "permissions",
          key: "id",
          as: "permission_id",
        },
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
    await queryInterface.addConstraint("roles_permissions", {
      type: "UNIQUE",
      name: "role_id_permission_id_unique",
      fields: ["role_id", "permission_id"],
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "roles_permissions",
      "role_id_permission_id_unique"
    );
    await queryInterface.dropTable("roles_permissions");
  },
};
