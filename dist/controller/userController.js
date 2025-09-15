"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.getUserWithBooks = exports.userLogin = exports.registerUser = void 0;
const userModel_1 = require("../model/userModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const generate_1 = __importDefault(require("../Utils/generate"));
// Register new user
const registerUser = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, phoneNo } = req.body;
        if (!name || !email || !password || !confirmPassword || !phoneNo) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }
        const userExist = await userModel_1.userModel.findOne({ email });
        if (userExist) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        if (confirmPassword !== password) {
            res.status(400).json({ message: "Passwords do not match" });
            return;
        }
        const hashPassword = await bcrypt_1.default.hash(password, 10);
        const createUser = new userModel_1.userModel({
            name,
            email,
            password: hashPassword,
            phoneNo,
            isLogin: false,
        });
        await createUser.save();
        res.status(201).json({ message: "User created", data: createUser });
    }
    catch (err) {
        res.status(500).json({ message: "An error occurred", err: err.message });
    }
};
exports.registerUser = registerUser;
// Login user
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "All fields required" });
            return;
        }
        const checkLogin = await userModel_1.userModel.findOne({ email });
        if (!checkLogin) {
            res.status(401).json({ message: "Invalid email or password" });
            return;
        }
        const isMatch = await bcrypt_1.default.compare(password, checkLogin.password);
        if (!isMatch) {
            res.status(401).json({ message: "Invalid email or password" });
            return;
        }
        checkLogin.isLogin = true;
        await checkLogin.save();
        const token = (0, generate_1.default)(String(checkLogin._id), checkLogin.role);
        res.status(200).json({
            message: "Login successful",
            user: {
                id: checkLogin._id,
                name: checkLogin.name,
                email: checkLogin.email,
                phoneNo: checkLogin.phoneNo,
                role: checkLogin.role,
            },
            token,
        });
    }
    catch (err) {
        res.status(500).json({ message: "An error occurred", err: err.message });
    }
};
exports.userLogin = userLogin;
// Get user with books
const getUserWithBooks = async (req, res) => {
    try {
        const { userId } = req.params;
        const getUser = await userModel_1.userModel
            .findById(userId)
            .populate("books", "author category yearPublished title");
        if (!getUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res
            .status(200)
            .json({ message: "User fetched successfully", data: getUser });
    }
    catch (err) {
        res.status(500).json({ message: "An error occurred", err: err.message });
    }
};
exports.getUserWithBooks = getUserWithBooks;
// Logout
const logout = async (req, res) => {
    if (!req.user) {
        res.status(401).json({ message: "Not logged in" });
        return;
    }
    const user = await userModel_1.userModel.findById(req.user._id);
    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }
    user.isLogin = false;
    await user.save();
    res.json({ message: "Logged out" });
};
exports.logout = logout;
//# sourceMappingURL=userController.js.map