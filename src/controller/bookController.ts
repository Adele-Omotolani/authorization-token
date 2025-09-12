import { Request, Response } from "express"
import { bookModel } from "../model/bookModel";
import { userModel } from "../model/userModel";

export const RegisterBook = async(req:Request,res:Response):Promise<void>=>{
    try{
        const { title ,yearPublished,author,category,seller} = req.body
        if(!title || !yearPublished || !author || !category || !seller){
            res.status(400).json({ message: "All fields are required" });
        }

        const createBook = new bookModel({
            title,
            yearPublished,
            author,
            category,
            seller
        })
await createBook.save()
await userModel.findByIdAndUpdate(
  seller,
  { $push: { books: createBook._id } },
  { new: true }
);

// const user = await userModel.findById(seller);
// if (user) {
//   user.books.push(createBook._id);
//   await user.save();
// }


res.status(200).json({message:"Book created successfully",data:createBook})
    }catch(err:any){
        res.status(500).json({message:"An error occurred",err:err.message})
    }
}


export const getBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const books = await bookModel.find().populate("seller", "name email phoneNo");
    // only include seller's name, email, phoneNo

    res
      .status(200)
      .json({ message: "Books fetched successfully", data: books });
  } catch (err: any) {
    res.status(500).json({ message: "An error occurred", error: err.message });
  }
};
