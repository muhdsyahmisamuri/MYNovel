import express from "express";
import { login } from "../controllers/loginController.js";
import { register } from "../controllers/registerController.js";
import { validateOtp } from "../controllers/validateOtpController.js";
import { fetchNovel } from "../controllers/novelController.js";
import authenticateToken from "../middleware/authenticateToken.js";

const router = express.Router();

router.post("/login", authenticateToken, login);
router.post("/register", authenticateToken, register);
router.post("/validateOtp", authenticateToken, validateOtp);
router.get("/fetchNovel", authenticateToken, fetchNovel);
router.get("/novel/:id", authenticateToken, fetchNovel);

export default router;
