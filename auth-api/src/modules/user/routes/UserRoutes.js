import { Router } from "express";
import UserController from "../controller/UserController.js";

const router = new Router();

router.get('/api/v1/user/id/:id', UserController.findById);
router.get('/api/v1/user/email/:email', UserController.findByEmail);
router.post('/api/v1/user/auth', UserController.getAccessToken);

export default router;