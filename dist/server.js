"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./config/db");
const userRoutes_1 = require("./routes/userRoutes");
const bookRoutes_1 = require("./routes/bookRoutes");
const adminRoutes_1 = require("./routes/adminRoutes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = process.env.PORT;
(0, db_1.connectDB)();
app.use("/api", userRoutes_1.UserRoutes);
app.use("/api", bookRoutes_1.bookRoutes);
app.use("/api", adminRoutes_1.adminRouter);
app.listen(port, () => { console.log(`server http://localhost:${port}`); });
//# sourceMappingURL=server.js.map