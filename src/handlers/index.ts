import User from "../models/User.ts";
import slug from 'slug';
import { Request, Response } from "express";
import { hashPassword } from "../utils/auth.ts";

export const createAccount = async (req : Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) {
            const error = new Error("User already exists");
            res.status(400).json({ msg: error.message });
            return;
        }

        const handle = slug(req.body.hanle, '')
        const handleExists = await User.findOne({ handle });
        if (handleExists) {
            const error = new Error("Nombre de usario no disponible");
            res.status(400).json({ msg: error.message });
            return;
        }

        const user = new User(req.body);
        user.password = await hashPassword(password)
        user.handle = handle;

        await user.save();
        res.status(201).send("User created successfully");
    } catch (error) {
        
    }
}