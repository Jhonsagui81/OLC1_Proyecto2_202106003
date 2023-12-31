import express from 'express'; // ESModules
// const express = require('express'); // CommonJS
import { interpreteController } from '../controllers/interprete.controller';
const router = express.Router();


// con controlador
router.get('/ping', interpreteController.pong);

router.get('/get', interpreteController.getDatos);

// interpretar codigo fuente
router.post('/interpretar', interpreteController.interpretar);
export default router;