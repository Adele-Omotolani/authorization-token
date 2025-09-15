"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
const express_1 = __importDefault(require("express"));
const adminController_1 = require("../controller/adminController");
const jwt_1 = require("../JWT/jwt");
const roleGuard_1 = require("../middleware/roleGuard");
exports.adminRouter = express_1.default.Router();
exports.adminRouter.use(jwt_1.JWT, (0, roleGuard_1.requireRole)(["admin"]));
exports.adminRouter.post("/signupadmin", adminController_1.SignUpAdmin);
exports.adminRouter.post("/loginadmin", adminController_1.LoginAdmin);
exports.adminRouter.get("/getone/:id", adminController_1.GetOneAdmin);
exports.adminRouter.get("/getall", adminController_1.getAllUser);
exports.adminRouter.put("/update/:id", adminController_1.UpdateAdmin);
exports.adminRouter.delete("/deleteone/:id", adminController_1.deleteOneAdmin);
exports.adminRouter.delete("/deleteall", adminController_1.deleteAllAdmins);
//# sourceMappingURL=adminRoutes.js.map