"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = exports.userSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.userSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNo: { type: String, required: true },
    role: { type: String, default: "user" },
    isLogin: { type: Boolean, default: false },
    books: [{ type: mongoose_1.default.Types.ObjectId, ref: "books" }],
}, { timestamps: true });
exports.userModel = mongoose_1.default.model("user", exports.userSchema);
//# sourceMappingURL=userModel.js.map