import express from 'express';
import { authMiddleware } from '../middlewares/auth.js';
import controller from '../controller/EmpresaController.js';

const router = express.Router();
router.use(authMiddleware);

router.get('/empresa', controller.findAll);

export { router as EmpresaRouter };
