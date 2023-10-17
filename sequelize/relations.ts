import { User, Profiles } from ".";

export const applyRelationships = () => {
  Profiles.hasOne(User, {
    onDelete: "CASCADE",
  });
};
