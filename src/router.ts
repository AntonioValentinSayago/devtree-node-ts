import { Router } from "express";
import { createAccount } from "./handlers/index.ts";

const router = Router();

/** Autenticacion y Registro */
router.get("/auth/register", createAccount)

export default router;