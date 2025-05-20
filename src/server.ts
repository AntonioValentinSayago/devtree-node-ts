// const express = require('express');
import express from 'express';
import router from './router.ts';
const app = express();

app.use('/', router);
export default app;