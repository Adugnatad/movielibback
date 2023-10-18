import { Request, Response } from "express";
import { User, Profile } from "../sequelize";
import { check, validationResult } from "express-validator";
import { checkHash, hash } from "../config.ts/hash";
import { generateToken } from "../config.ts/jwtToken";

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
      User.create({
        username: username,
        password: hashedPassword,
      })

        .then((user: any) => {
          Profile.create({
            name: Full_Name,
            gender: gender,
            location: location,
            website: website,
            picture: "",
            UserId: user.id,
          })
            .then((profile: any) => {
              res.json({
                id: user.id,
                username: user.username,
                fullName: profile.Full_Name,
                gender: profile.gender,
                location: profile.location,
                website: profile.website,
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

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user: any = await User.findOne({
    where: {
      username: username,
    },
  });

  if (user) {
    const passwordCheck = checkHash(password, user.password);
    if (passwordCheck) {
      const token = generateToken(user.username);
      res.status(200).json({ token });
    } else {
      res.status(401).send("Invalid Credentials");
    }
  } else {
    res.status(400).send("User not found!");
  }
};
