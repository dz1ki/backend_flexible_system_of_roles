"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("users", [
      {
        first_name: "Johni",
        last_name: "Doel",
        email: "doel123@examples.com",
        mail_confirmation_code: "zik57",
        password:
          "$2b$05$0fgWBd5.Xa8mVGRTc8S/7OWlHTpsk69H8etLEJeA3kia8z7VQPs42",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: "Oliver",
        last_name: "Williams",
        email: "will24@examples.com",
        mail_confirmation_code: "e1ere",
        password:
          "$2b$05$a88bRPeOQQAwTv8CJdIXE.IsJ.UZidPa1.pzEYwlAenw/Y3Ggkfbi",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  },
};
