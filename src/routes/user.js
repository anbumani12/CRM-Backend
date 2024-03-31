import express from "express";
import validate from "../middleware/Validate.js";
import superAdminGuard from "../middleware/SuperAdminGuard.js";
import UserController from "../controllers/users.js";
import EmailService from "../common/EmailService.js";

const router = express.Router();

router.get('/',UserController.getAllUsers)
router.post('/create',UserController.create)
router.delete('/:id',validate,superAdminGuard,UserController.deleteUser)
router.post('/login',UserController.login)
router.post("/email-test", EmailService.welcomeEmail);

export default router;
