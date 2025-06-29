import User from "../models/User.ts";
import { validationResult } from "express-validator";
import slug from 'slug';
import type { Request, Response } from 'express';
import { checkPassword, hashPassword } from "../utils/auth.ts";

export const createAccount = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body
    const userExists = await User.findOne({ email })
    if (userExists) {
        const error = new Error('Un usuario con ese mail ya esta registrado')
        res.status(409).json({ error: error.message })
        return;
    }

    const handle = slug(req.body.handle, '')
    const handleExists = await User.findOne({ handle })
    if (handleExists) {
        const error = new Error('Nombre de usuario no disponible')
        res.status(409).json({ error: error.message })
        return;
    }

    const user = new User(req.body)
    user.password = await hashPassword(password)
    user.handle = handle

    await user.save()
    res.status(201).send('Registro Creado Correctamente')
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