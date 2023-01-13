import { Sequelize } from "sequelize";
import * as config from "config";

export const sequelize = new Sequelize(
  config.get("DBconfig.database"),
  config.get("DBconfig.username"),
  config.get("DBconfig.password"),
  {
    dialect: config.get("DBconfig.dialect"),
    host: config.get("DBconfig.host"),
    port: config.get("DBconfig.port"),
  }
);
