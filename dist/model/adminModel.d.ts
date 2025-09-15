import "dotenv/config";
import mongoose from "mongoose";
export interface IAdmin extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    password: string;
    email: string;
    phoneNumber: string;
    role: string;
    isLogin: boolean;
}
export declare const Adminmodel: mongoose.Model<IAdmin, {}, {}, {}, mongoose.Document<unknown, {}, IAdmin, {}, {}> & IAdmin & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=adminModel.d.ts.map