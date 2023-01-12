"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("permissions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      object_id: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        allowNull: false,
        references: {
          model: "permission_objects",
          key: "id",
          as: "object_id",
        },
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      action: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: ["Read", "Create", "Update", "Delete"],
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

    await queryInterface.addConstraint("permissions", {
      type: "UNIQUE",
      name: "object_id_action_unique",
      fields: ["object_id", "action"],
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "permissions",
      "object_id_action_unique"
    );
    await queryInterface.dropTable("permissions");
  },
};
