import { Request, Response } from "express";
import User from "../models/userModel";

export default class UserControler {

  static getUsers = async (req: Request, res: Response) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
        res.status(500).json({ message: errorMessage });
    }
  };
  
  static createUser = async (req: Request, res: Response) => {
    try {
      const newUser = new User(req.body);
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
        res.status(500).json({ message: errorMessage });
    }
  };
}
