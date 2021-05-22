import express from "express";
import {
    isLoggedIn,
  login,
  protectedRoute,
  signup,
} from "../controllers/authController.js";
const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.get('/user', isLoggedIn);

// router.use(protectedRoute).post("/logout", logout);

export default router;
