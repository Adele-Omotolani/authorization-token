import { Request, Response } from "express";
import { AuthRequest } from "../JWT/jwt";
export declare const registerUser: (req: Request, res: Response) => Promise<void>;
export declare const userLogin: (req: Request, res: Response) => Promise<void>;
export declare const getUserWithBooks: (req: Request, res: Response) => Promise<void>;
export declare const logout: (req: AuthRequest, res: Response) => Promise<void>;
//# sourceMappingURL=userController.d.ts.map