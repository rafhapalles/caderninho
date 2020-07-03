import express from 'express';
import { authMiddleware } from '../middlewares/auth.js';

const router = express.Router();
router.use(authMiddleware);
//
app.get('/empresa');

export { router as EmpresaRouter };
