import { Response, NextFunction } from "express";
import { AuthRequest } from "../JWT/jwt";
export declare const requireRole: (roles: string[]) => (req: AuthRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=roleGuard.d.ts.map