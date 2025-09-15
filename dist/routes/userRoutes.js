"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const jwt_1 = require("../JWT/jwt");
const roleGuard_1 = require("../middleware/roleGuard");
exports.UserRoutes = express_1.default.Router();
exports.UserRoutes.use(jwt_1.JWT, (0, roleGuard_1.requireRole)(["user"]));
exports.UserRoutes.post("/signup", userController_1.registerUser);
exports.UserRoutes.post("/login", userController_1.userLogin);
exports.UserRoutes.get("/getUser/:userId", userController_1.getUserWithBooks);
//# sourceMappingURL=userRoutes.js.map