"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("permission_objects", {
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
        default: false,
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
    await queryInterface.addConstraint("permission_objects", {
      type: "UNIQUE",
      name: "slugname_unique",
      fields: ["slugname"],
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "permission_objects",
      "slugname_unique"
    );
    await queryInterface.dropTable("permission_objects");
  },
};
