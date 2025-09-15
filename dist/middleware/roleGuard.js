"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireRole = void 0;
// Middleware factory: returns a middleware that checks role
const requireRole = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: "Not authenticated" });
        }
        if (!roles.includes(req.user.role)) {
            return res
                .status(403)
                .json({ message: "Access denied: insufficient role" });
        }
        next();
    };
};
exports.requireRole = requireRole;
//# sourceMappingURL=roleGuard.js.map