"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUser = exports.deleteOneAdmin = exports.deleteAllAdmins = exports.UpdateAdmin = exports.GetAllAdmins = exports.GetOneAdmin = exports.LoginAdmin = exports.SignUpAdmin = void 0;
const adminModel_1 = require("../model/adminModel");
const argon2_1 = __importDefault(require("argon2"));
const userModel_1 = require("../model/userModel");
const SignUpAdmin = async (req, res) => {
    try {
        const { name, email, password, phoneNumber } = req.body;
        if (!name || !email || !password || !phoneNumber) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }
        const checkAdminExists = await adminModel_1.Adminmodel.findOne({ email });
        if (checkAdminExists) {
            res.status(400).json({ message: "Admin already exists" });
            return;
        }
        const hashPassword = await argon2_1.default.hash(password);
        const createAdmin = await adminModel_1.Adminmodel.create({
            name,
            email,
            password: hashPassword,
            phoneNumber,
            role: "admin",
            isLogin: false,
        });
        res
            .status(201)
            .json({ message: "Admin created successfully", data: createAdmin });
    }
    catch (err) {
        res.status(500).json({ message: "An error occurred", err: err.message });
    }
};
exports.SignUpAdmin = SignUpAdmin;
const LoginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }
        const checkLogin = await adminModel_1.Adminmodel.findOne({ email });
        if (!checkLogin) {
            res.status(400).json({ message: "Invalid email" });
            return;
        }
        const isMatch = await argon2_1.default.verify(checkLogin.password, password);
        if (!isMatch) {
            res.status(400).json({ message: "Invalid password" });
            return;
        }
        checkLogin.isLogin = true;
        await checkLogin.save();
        res.status(200).json({
            message: "Login successful",
            name: checkLogin.name,
            email: checkLogin.email,
            phoneNumber: checkLogin.phoneNumber,
            role: checkLogin.role,
        });
    }
    catch (err) {
        res.status(500).json({ message: "An error occurred", err: err.message });
    }
};
exports.LoginAdmin = LoginAdmin;
const GetOneAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const getOneAdmin = await adminModel_1.Adminmodel.findById(id);
        if (!getOneAdmin) {
            res.status(404).json({ message: "Admin not found" });
            return;
        }
        res
            .status(200)
            .json({ message: "Admin gotten successfully", data: getOneAdmin });
    }
    catch (err) {
        res.status(500).json({ message: "An error occurred", err: err.message });
    }
};
exports.GetOneAdmin = GetOneAdmin;
const GetAllAdmins = async (req, res) => {
    try {
        const getAllAdmins = await adminModel_1.Adminmodel.find();
        if (getAllAdmins.length === 0) {
            res.status(404).json({ message: "Admins not found" });
            return;
        }
        res
            .status(200)
            .json({ message: "Admins gotten successfully", data: getAllAdmins });
    }
    catch (err) {
        res.status(500).json({ message: "An error occurred", err: err.message });
    }
};
exports.GetAllAdmins = GetAllAdmins;
const UpdateAdmin = async (req, res) => {
    try {
        const { name, email, password, phoneNumber } = req.body;
        const updateData = { name, email, phoneNumber };
        if (password) {
            updateData.password = await argon2_1.default.hash(password);
        }
        const updateAdmin = await adminModel_1.Adminmodel.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!updateAdmin) {
            res.status(404).json({ message: "Admin not found" });
            return;
        }
        res
            .status(200)
            .json({ message: "Admin updated successfully", data: updateAdmin });
    }
    catch (err) {
        res.status(500).json({ message: "An error occurred", err: err.message });
    }
};
exports.UpdateAdmin = UpdateAdmin;
const deleteAllAdmins = async (req, res) => {
    try {
        const deleteResult = await adminModel_1.Adminmodel.deleteMany();
        if (deleteResult.deletedCount === 0) {
            res.status(404).json({ message: "No admins found to delete" });
            return;
        }
        res.status(200).json({
            message: "Admins deleted successfully",
            deletedCount: deleteResult.deletedCount,
        });
    }
    catch (err) {
        res.status(500).json({ message: "An error occurred", err: err.message });
    }
};
exports.deleteAllAdmins = deleteAllAdmins;
const deleteOneAdmin = async (req, res) => {
    try {
        const deleteOneAdmin = await adminModel_1.Adminmodel.findByIdAndDelete(req.params.id);
        if (!deleteOneAdmin) {
            res.status(404).json({ message: "Admin not found" });
            return;
        }
        res.status(200).json({ message: "Admin deleted successfully" });
    }
    catch (err) {
        res.status(500).json({ message: "An error occurred", err: err.message });
    }
};
exports.deleteOneAdmin = deleteOneAdmin;
//GET ALL USERS
const getAllUser = async (req, res) => {
    try {
        const getAllUsers = await userModel_1.userModel.find();
        if (!exports.getAllUser) {
            res.status(404).json({ message: "Users not found" });
            return;
        }
        res.status(200).json({ message: "Users gotten successfully", data: getAllUsers });
    }
    catch (err) {
        res.status(500).json({ message: "An error occurred", err: err.message });
    }
};
exports.getAllUser = getAllUser;
//# sourceMappingURL=adminController.js.map