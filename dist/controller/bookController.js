"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBooks = exports.RegisterBook = void 0;
const bookModel_1 = require("../model/bookModel");
const userModel_1 = require("../model/userModel");
const RegisterBook = async (req, res) => {
    try {
        const { title, yearPublished, author, category, seller } = req.body;
        if (!title || !yearPublished || !author || !category || !seller) {
            res.status(400).json({ message: "All fields are required" });
        }
        const createBook = new bookModel_1.bookModel({
            title,
            yearPublished,
            author,
            category,
            seller
        });
        await createBook.save();
        await userModel_1.userModel.findByIdAndUpdate(seller, { $push: { books: createBook._id } }, { new: true });
        // const user = await userModel.findById(seller);
        // if (user) {
        //   user.books.push(createBook._id);
        //   await user.save();
        // }
        res.status(200).json({ message: "Book created successfully", data: createBook });
    }
    catch (err) {
        res.status(500).json({ message: "An error occurred", err: err.message });
    }
};
exports.RegisterBook = RegisterBook;
const getBooks = async (req, res) => {
    try {
        const books = await bookModel_1.bookModel.find().populate("seller", "name email phoneNo");
        // only include seller's name, email, phoneNo
        res
            .status(200)
            .json({ message: "Books fetched successfully", data: books });
    }
    catch (err) {
        res.status(500).json({ message: "An error occurred", error: err.message });
    }
};
exports.getBooks = getBooks;
//# sourceMappingURL=bookController.js.map