import { Request, Response } from "express";
import { User, Profiles } from "../sequelize";
import { check, validationResult } from "express-validator";
import { hash } from "../config.ts/hash";

export const signup = async (req: Request, res: Response) => {
  const { username, password, Full_Name, gender, location, website } = req.body;

  await check("gender", "gender can be either MALE or FEMALE")
    .isIn(["MALE", "FEMALE"])
    .run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(403).send(errors);
  }

  const hashedPassword = await hash(password);
  if (hashedPassword) {
    const u = await User.findOne({
      where: {
        username: username,
      },
    });

    if (u) {
      res.status(403).send("Username already exists");
    } else {
      await Profiles.create({
        name: Full_Name,
        gender: gender,
        location: location,
        website: website,
        picture: "",
      })
        .then((profile: any) => {
          User.create({
            username: username,
            password: hashedPassword,
            ProfileId: profile.id,
          })

            .then((user: any) => {
              res.json({
                id: user.id,
                username: user.username,
                profile: user.profileId,
              });
            })
            .catch((err) => {
              console.log(err);
              res.status(500).send();
            });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send();
        });
    }
  } else {
    res.status(500).send("password hash failed");
  }
};

export const getUser = async (req: Request, res: Response) => {
  const users = await User.findAll({ include: Profiles });
  res.json(users);
};
