import { Request, Response } from "express";
import { Iuser, userModel } from "../model/userModel";
import bcrypt from "bcrypt"
import generateToken from "../Utils/generate";

export const registerUser = async(req:Request,res:Response): Promise<void> =>{

  try{

    const {name,email,password,confirmPassword,phoneNo} = req.body
const {bookId} = req.params
    // const user = new userModel(req.body)
    // user.save()

    // res.status(200).json({message:"User created successfully",data:user})

    if(!name || !email || !password || !confirmPassword || !phoneNo ){
      res.status(400).json({message:"All fields are required"})
      return
    }
    const userExist = await userModel.findOne({email})
    if(userExist){
      res.status(400).json({message:"User Already Exist"})
    }
   if(confirmPassword !== password){
    res.status(400).json({message:"Password does not match"})
   }

   const hashPassword = await bcrypt.hash(password,10)
  //  const createUser = await userModel.create({
  //   name,
  //   email,
  //   password:hashPassword
  //  })
9
     const createUser =  new userModel({
       name,
       email,
       password: hashPassword,
       phoneNo,
       isLogin:false
     });
   await createUser.save();
   

   res.status(200).json({message:"User created",data:createUser})

  }catch(err:any){
      res.status(500).json({message:"An error occurred",err:err.message})
  }

}


export const userLogin = async(req:Request, res:Response):Promise<void>=>{
  try {
    const{email,password} = req.body as Pick<Iuser,"email" | "password">
    if(!email || !password){
      res.status(400).json({message:"All fields required"})
    }
    const checkLogin = await userModel.findOne({ email });
    if (!checkLogin) {
      res.status(400).json({ message: "Invalid email" });
      return;
    }

    const isMatch = await bcrypt.compare(password, checkLogin.password);
    
    if (!isMatch) {
      res.status(400).json({ message: "Incorrect Password" });
      return;
    }

    // Update and save login status
    checkLogin.isLogin = true;
    await checkLogin.save();

    const token = generateToken(String(checkLogin._id), checkLogin.role);

    res.status(200).json({
      message: "Login successful",
      name: checkLogin.name,
      email: checkLogin.email,
      password: checkLogin.password,
      phoneNo: checkLogin.phoneNo,
      token,
    });
  } catch (err: any) {
    res.status(500).json({ message: "An error occurred", err: err.message });
  }
}

export const getUserWithBooks = async(req:Request,res:Response):Promise<void>=>{
  try {
    const {userId} = req.params
    const getUser = await userModel
      .findById(userId)
      .populate("books", "author category yearPublished title");
    if(!getUser){
      res.status(400).json({message:"User not found"})
      return;
    }
        res
          .status(200)
          .json({ message: "User fetched successfully", data: getUser });
  } catch (err: any) {
    res.status(500).json({ message: "An error occurred", err: err.message });
  }
}