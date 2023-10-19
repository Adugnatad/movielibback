import express from "express";
import * as userController from "../controllers/user";

const user_router = express.Router();

user_router.post("/signup", userController.signup);
user_router.get("/login", userController.login);

export default user_router;
