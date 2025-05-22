// const express = require('express');
import express from 'express';
import 'dotenv/config';
import router from './router.ts';
import { connectDB } from './config/db.ts';
const app = express();
connectDB();
// Leer datos de - posman y/o formulario
app.use(express.json());

app.use('/', router);
export default app;