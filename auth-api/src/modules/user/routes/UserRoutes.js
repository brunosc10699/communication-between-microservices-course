import { Router } from 'express';

import CheckToken from '../../../config/auth/CheckToken.js';
import UserController from '../controller/UserController.js';

const router = new Router();

router.post('/api/v1/user/auth', UserController.getAccessToken);

router.use(CheckToken);

router.get('/api/v1/user/id/:id', UserController.findById);
router.get('/api/v1/user/email/:email', UserController.findByEmail);

export default router;