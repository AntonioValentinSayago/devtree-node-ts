import { Router } from "express";

const router = Router();

/** Autenticacion y Registro */
router.get("/auth/register", (req, res) => {
    res.send("Register");
})

export default router;