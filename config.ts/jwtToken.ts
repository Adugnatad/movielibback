import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { secret_key } from "./secrets";

export const generateToken = (username: string) => {
  const payload = {
    username: username,
  };
  const token = jwt.sign(payload, secret_key, { expiresIn: "1h" });
  return token;
};

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authToken = req.header("Authorization")?.replace("Bearer ", "");

  if (!authToken) {
    return res.status(401).json({ message: "Token not provided" });
  }

  try {
    const decoded = jwt.verify(authToken, secret_key);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
