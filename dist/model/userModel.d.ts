import mongoose from "mongoose";
export interface Iuser extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    password: string;
    phoneNo: string;
    role: string;
    isLogin: boolean;
    books: mongoose.Types.ObjectId[];
}
export declare const userSchema: mongoose.Schema<Iuser>;
export declare const userModel: mongoose.Model<Iuser, {}, {}, {}, mongoose.Document<unknown, {}, Iuser, {}, {}> & Iuser & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=userModel.d.ts.map