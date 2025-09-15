import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { userModel, Iuser } from "../model/userModel";
import { Adminmodel, IAdmin } from "../model/adminModel";

// A user can either be a normal user or an admin
type AuthUser = Iuser | IAdmin;

export interface AuthRequest extends Request {
  user?: AuthUser;
}

export const JWT = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.header("Authorization");
  const token = authHeader?.replace("Bearer ", "").trim();

  if (!token) {
    res.status(401).json({ message: "No token Provided" });
    return;
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    // Try to find user in Users collection
    const user = await userModel
      .findById(decoded.id || decoded._id)
      .select("-password");

    // If not found, try Admins collection
    // if (!user) {
    //   user = await Adminmodel.findById(decoded.id || decoded._id).select("-password");
    // }

    if (!user) {
      res.status(404).json({ message: "User not Found" });
      return;
    }

    req.user = user as AuthUser;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token", err });
  }
};
