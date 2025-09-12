import express,{ Router } from "express";
import { getBooks, RegisterBook } from "../controller/bookController";

export const bookRoutes:Router = express.Router()

bookRoutes.post("/createBook",RegisterBook)
bookRoutes.get("/getBooks/:id", getBooks);