import { Sequelize } from "sequelize";
import mysql2 from "mysql2";

export const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "mysql",
  dialectModule: mysql2,
  dialectOptions: {
    ssl: { rejectUnauthorized: true },
  },
});

sequelize.sync();
