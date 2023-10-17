import express from "express";
import * as userController from "../controllers/user";

const user_router = express.Router();

user_router.post("/", userController.signup).get("/", userController.getUser);

export default user_router;
