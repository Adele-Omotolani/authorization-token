"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookModel = exports.bookSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.bookSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    yearPublished: { type: String, required: true },
    category: { type: String, required: true },
    author: { type: String, required: true },
    seller: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "user", }
});
exports.bookModel = mongoose_1.default.model("books", exports.bookSchema);
//# sourceMappingURL=bookModel.js.map