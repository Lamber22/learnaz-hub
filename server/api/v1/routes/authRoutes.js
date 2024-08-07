import { Router } from "express";
import {
  loginUser,
  registerUser,
  forgotPassword,
  resetPassword,
  signoutUser,
} from "../controllers/authController.js";
import { authMiddleware, isAdmin } from "../utils/authMiddleware.js";
import {
  loginAdmin,
  registerAdmin,
} from "../controllers/admin/adminController.js";
import passport from '../utils/passport.js';

const router = Router();

// Example of a protected route
// router.get('/protected', authMiddleware, (req, res) => {
//     res.status(200).json({ message: 'You have accessed a protected route' });
// });
router.use(passport.initialize());
// Routes for user authentication
router.post("/signup-user", registerUser);
router.post("/login-user", loginUser);
router.post("/signout", signoutUser);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPassword);


// routes for Admin authentication
router.post("/register-admin", /*authMiddleware, isAdmin,*/ registerAdmin);
router.post("/admin-login", /*authMiddleware, isAdmin,*/ loginAdmin);

export default router;
