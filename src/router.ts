import { Router } from "express";
import { body } from "express-validator"
import { createAccount, login } from "./handlers/index.ts";
import { handleInputErrors } from "./middlewares/validation.ts";

const router = Router();

/** Autenticacion y Registro */
router.post("/auth/register", 
    body('handle').notEmpty().withMessage('El handle no puede ir vacio'),
    body('name').notEmpty().withMessage('El nombre no puede ir vacio'),
    body('email').isEmail().withMessage('El email no es un formato valido'),
    body('password')
        .isLength({min: 8})
        .withMessage('El password es muy corto, minimo 8 caracteres'),
    handleInputErrors,
    createAccount
)

router.post('/auth/login' ,
    body('email').isEmail().withMessage('El email no es un formato valido'),
    body('password')
        .notEmpty()
        .withMessage('El password es obligatorio'),
    handleInputErrors,    
    login
)

export default router;