import User from "../models/User.ts";
import { validationResult } from "express-validator";
import slug from 'slug';
import type { Request, Response } from 'express';
import { checkPassword, hashPassword } from "../utils/auth.ts";

export const createAccount = async (req: Request, res: Response) => {

    try {
        const { email, password } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) {
            const error = new Error("User already exists");
            res.status(409).json({ msg: error.message });
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
        res.status(401).send('Error')
    }
}

export const login = async (req: Request, res: Response) => {

    // Validar si el usuaio existe
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        const error = new Error("El usuario no existe");
        res.status(401).json({ msg: error.message });
        return;
    }

    // Comprobar el password es correcto
    const isPasswordCorrect = await checkPassword(password, user.password)
    if (!isPasswordCorrect) {
        const error = new Error("El password es incorrecto");
        res.status(401).json({ msg: error.message });
        return;
    }

    res.send('Usuario Autenticado')
}