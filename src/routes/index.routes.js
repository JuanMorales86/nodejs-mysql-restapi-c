import { Router } from 'express';
import { ping } from '../controllers/index.controller.js';

const router = Router();

//Conexion a Bases de Datos Mysql
router.get('/ping', ping);

export default router;