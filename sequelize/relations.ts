import { User, Profile } from ".";

export const applyRelationships = () => {
  User.hasOne(Profile, {
    onDelete: "CASCADE",
  });
};
