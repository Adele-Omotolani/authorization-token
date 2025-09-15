import { Request, Response, NextFunction } from "express";
import { Iuser } from "../model/userModel";
import { IAdmin } from "../model/adminModel";
type AuthUser = Iuser | IAdmin;
export interface AuthRequest extends Request {
    user?: AuthUser;
}
export declare const JWT: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export {};
//# sourceMappingURL=jwt.d.ts.map