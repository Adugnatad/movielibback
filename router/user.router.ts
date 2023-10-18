import express from "express";
import * as userController from "../controllers/user";

const user_router = express.Router();

user_router.post("/", userController.signup);
user_router.get("/", userController.login);

export default user_router;
