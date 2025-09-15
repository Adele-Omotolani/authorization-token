"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = require("../model/userModel");
const JWT = async (req, res, next) => {
    const authHeader = req.header("Authorization");
    const token = authHeader?.replace("Bearer ", "").trim();
    if (!token) {
        res.status(401).json({ message: "No token Provided" });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // Try to find user in Users collection
        const user = await userModel_1.userModel.findById(decoded.id || decoded._id).select("-password");
        // If not found, try Admins collection
        // if (!user) {
        //   user = await Adminmodel.findById(decoded.id || decoded._id).select("-password");
        // }
        if (!user) {
            res.status(404).json({ message: "User not Found" });
            return;
        }
        req.user = user;
        next();
    }
    catch (err) {
        res.status(401).json({ message: "Invalid token", err });
    }
};
exports.JWT = JWT;
//# sourceMappingURL=jwt.js.map