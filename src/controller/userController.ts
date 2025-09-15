import { Request, Response } from "express";
import { Iuser, userModel } from "../model/userModel";
import bcrypt from "bcrypt";
import generateToken from "../Utils/generate";
import { AuthRequest } from "../JWT/jwt"; // <-- for logout typing

// Register new user
export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password, confirmPassword, phoneNo } = req.body;

    if (!name || !email || !password || !confirmPassword || !phoneNo) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    
    const userExist = await userModel.findOne({ email });
    if (userExist) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    if (confirmPassword !== password) {
      res.status(400).json({ message: "Passwords do not match" });
      return;
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const createUser = new userModel({
      name,
      email,
      password: hashPassword,
      phoneNo,
      isLogin: false,
    });
    await createUser.save();

    res.status(201).json({ message: "User created", data: createUser });
  } catch (err: any) {
    res.status(500).json({ message: "An error occurred", err: err.message });
  }
};

// Login user
export const userLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body as Pick<Iuser, "email" | "password">;

    if (!email || !password) {
      res.status(400).json({ message: "All fields required" });
      return;
    }

    const checkLogin = await userModel.findOne({ email });
    if (!checkLogin) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    const isMatch = await bcrypt.compare(password, checkLogin.password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    checkLogin.isLogin = true;
    await checkLogin.save();

    const token = generateToken(String(checkLogin._id), checkLogin.role);

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
  } catch (err: any) {
    res.status(500).json({ message: "An error occurred", err: err.message });
  }
};

// Get user with books
export const getUserWithBooks = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.params;
    const getUser = await userModel
      .findById(userId)
      .populate("books", "author category yearPublished title");

    if (!getUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res
      .status(200)
      .json({ message: "User fetched successfully", data: getUser });
  } catch (err: any) {
    res.status(500).json({ message: "An error occurred", err: err.message });
  }
};

// Logout
export const logout = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ message: "Not logged in" });
    return;
  }

  const user = await userModel.findById(req.user._id);
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  user.isLogin = false;
  await user.save();

  res.json({ message: "Logged out" });
};
