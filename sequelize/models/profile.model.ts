import { DataTypes } from "sequelize";
import { sequelize } from "../index";

const Profile = sequelize.define("Profile", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  gender: {
    allowNull: false,
    type: DataTypes.ENUM("MALE", "FEMALE"),
  },
  location: {
    type: DataTypes.STRING,
  },
  website: {
    type: DataTypes.STRING,
  },
  picture: {
    type: DataTypes.STRING,
  },
});

export default Profile;
