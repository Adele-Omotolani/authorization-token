"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const connectDB = async () => {
    const MONGODB_URL = process.env.MONGODB_URL;
    if (!MONGODB_URL) {
        console.error("Missing MONGODB_URL in env");
        throw new Error("Missing MONGODB_URL");
    }
    try {
        await mongoose_1.default.connect(MONGODB_URL);
        console.log("Connected DB");
    }
    catch (err) {
        console.error("Error connecting to DB", err);
    }
};
exports.connectDB = connectDB;
//# sourceMappingURL=db.js.map