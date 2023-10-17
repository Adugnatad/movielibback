import { DataTypes } from "sequelize";
import { sequelize } from "../index";

const Movie = sequelize.define("Movie", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  movie_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  duration: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  rating: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

export default Movie;
