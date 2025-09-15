import express, { Router } from "express";
import {
  getUserWithBooks,
  registerUser,
  userLogin,
} from "../controller/userController";
// import { JWT } from "../JWT/jwt";

export const UserRoutes: Router = express.Router();

// UserRoutes.use(JWT, requireRole(["user"]));

UserRoutes.post("/signup", registerUser);
UserRoutes.post("/login", userLogin);
UserRoutes.get("/getUser/:userId", getUserWithBooks);
