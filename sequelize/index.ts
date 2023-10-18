import { Sequelize } from "sequelize";
import mysql2 from "mysql2";

export const sequelize = new Sequelize("adugna", "root", "admin", {
  host: "localhost",
  dialect: "mysql",
  dialectModule: mysql2,
});

import Movie from "./models/movie.model";
import User from "./models/user.model";
import Profile from "./models/profile.model";
import { applyRelationships } from "./relations";

// export const sequelize = new Sequelize(process.env.DATABASE_URL, {
//   dialect: "mysql",
//   dialectModule: mysql2,
//   dialectOptions: {
//     ssl: { rejectUnauthorized: true },
//   },
// });

applyRelationships();

sequelize.sync();

export { Movie, User, Profile };
