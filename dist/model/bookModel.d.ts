import mongoose from "mongoose";
export interface IBook extends Document {
    title: string;
    yearPublished: string;
    category: string;
    author: string;
    seller: mongoose.Schema.Types.ObjectId;
}
export declare const bookSchema: mongoose.Schema<IBook>;
export declare const bookModel: mongoose.Model<IBook, {}, {}, {}, mongoose.Document<unknown, {}, IBook, {}, {}> & IBook & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>;
//# sourceMappingURL=bookModel.d.ts.map