import mongoose from "mongoose";

export interface IBook extends Document {
  title: string;
  yearPublished: string;
  category: string;
  author: string;
  seller:mongoose.Schema.Types.ObjectId
}

export const bookSchema: mongoose.Schema<IBook> = new mongoose.Schema({
  title: { type: String, required: true },
  yearPublished: { type: String, required: true },
  category: { type: String, required: true },
  author: { type: String, required: true },
  seller:{type:mongoose.Schema.Types.ObjectId, ref:"user", }
});

export const bookModel = mongoose.model<IBook>("books",bookSchema)