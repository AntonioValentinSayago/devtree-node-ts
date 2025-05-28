import { Router } from "express";
import { body } from "express-validator"
import { createAccount } from "./handlers/index.ts";

const router = Router();

/** Autenticacion y Registro */
router.post("/auth/register", 
    body('handle').notEmpty().withMessage('El handle no puede ir vacio'),
    body('nombre').notEmpty().withMessage('El nombre no puede ir vacio'),
    body('email').isEmail().withMessage('El email no es un formato valido'),
    body('password')
        .isLength({min: 8})
        .withMessage('El password es muy corto, minimo 8 caracteres'),
    createAccount
)

export default router;