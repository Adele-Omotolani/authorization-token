import express,{ Router } from "express";
import { getUserWithBooks, registerUser, userLogin } from "../controller/userController";

export const UserRoutes:Router = express.Router()

UserRoutes.post("/signup",registerUser)
UserRoutes.post("/login", userLogin);
UserRoutes.get("/getUser/:userId",getUserWithBooks)