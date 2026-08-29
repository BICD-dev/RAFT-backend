import { Router } from "express";
import { AuthController } from "./auth.controller";
import { validateDto } from "../utils/middleware/validation.middleware";
import { CreateAccountDto } from "./dtos/create-account.dto";
import { LoginDto } from "./dtos/login.dto";

const router = Router();
const authController = new AuthController();

router.post("/register", validateDto(CreateAccountDto), authController.register);
router.post("/login", validateDto(LoginDto), authController.login);

export default router;
