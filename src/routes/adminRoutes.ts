import { Router } from "express";
import express from "express";
import {
  SignUpAdmin,
  LoginAdmin,
  GetOneAdmin,
  UpdateAdmin,
  deleteOneAdmin,
  deleteAllAdmins,
  getAllUser,
} from "../controller/adminController";
import { JWT } from "../JWT/jwt";


export const adminRouter: Router = express.Router();

adminRouter.use(JWT);

adminRouter.post("/signupadmin", SignUpAdmin);
adminRouter.post("/loginadmin", LoginAdmin);
adminRouter.get("/getone/:id", GetOneAdmin);
adminRouter.get("/getall", getAllUser);
adminRouter.put("/update/:id", UpdateAdmin);
adminRouter.delete("/deleteone/:id", deleteOneAdmin);
adminRouter.delete("/deleteall", deleteAllAdmins);
