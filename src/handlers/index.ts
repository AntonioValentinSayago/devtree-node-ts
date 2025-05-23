import User from "../models/User.ts";
import { Request, Response } from "express";

export const createAccount = async (req : Request, res: Response) => {
    try {
        const { email} = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) {
            const error = new Error("User already exists");
            res.status(400).json({ msg: error.message });
            return;
        }
        const user = new User(req.body);
        await user.save();
        res.status(201).send("User created successfully");
    } catch (error) {
        
    }
}