"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users_roles", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
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

      user_id: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        allowNull: false,
        references: {
          model: "users",
          key: "id",
          as: "user_id",
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

    await queryInterface.addConstraint("users_roles", {
      type: "UNIQUE",
      name: "user_id_role_id_unique",
      fields: ["user_id", "role_id"],
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "users_roles",
      "user_id_role_id_unique"
    );
    await queryInterface.dropTable("users_roles");
  },
};
