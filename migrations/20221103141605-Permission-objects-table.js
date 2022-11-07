"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Permission_objects", {
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
    });
    await queryInterface.addConstraint("Permission_objects", {
      type: "UNIQUE",
      name: "slugname_unique",
      fields: ["slugname"],
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "Permission_objects",
      "slugname_unique"
    );
    await queryInterface.dropTable("Permission_objects");
  },
};
