import mongoose from "mongoose"

export interface Iuser extends Document {
  name: string;
  email: string;
  password: string;
  phoneNo: string;
  role: string;
  isLogin: boolean;
  books: mongoose.Types.ObjectId[];
}

export const userSchema: mongoose.Schema<Iuser> = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNo: { type: String, required: true },
    role: { type: String, default: "user" },
    isLogin: { type: Boolean, default: false },
    books: [{ type: mongoose.Types.ObjectId, ref: "books" }],
  },
  { timestamps: true }
);

export const userModel = mongoose.model<Iuser>("user",userSchema)