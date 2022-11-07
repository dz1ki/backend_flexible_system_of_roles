"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Permissions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      object_id: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        isNullable: false,
        references: {
          model: "Permission_objects",
          key: "id",
          as: "object_id",
        },
      },
      name: {
        type: Sequelize.STRING,
        isNullable: false,
      },
      action: {
        type: Sequelize.ENUM,
        isNullable: false,
        values: ["Read", "Create", "Update", "Delete"],
      },
      is_system: {
        type: Sequelize.BOOLEAN,
        default: false,
        isNullable: false,
      },
    });
    await queryInterface.addConstraint("Permissions", {
      type: "UNIQUE",
      name: "object_id_action_unique",
      fields: ["object_id", "action"],
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "Permissions",
      "object_id_action_unique"
    );
    await queryInterface.dropTable("Permissions");
  },
};
