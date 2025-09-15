"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const bookController_1 = require("../controller/bookController");
exports.bookRoutes = express_1.default.Router();
exports.bookRoutes.post("/createBook", bookController_1.RegisterBook);
exports.bookRoutes.get("/getBooks/:id", bookController_1.getBooks);
//# sourceMappingURL=bookRoutes.js.map