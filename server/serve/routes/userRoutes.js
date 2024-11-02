import express from "express";
import {
  accountDeleteController,
  createUserProfileController,
  getAllUsersController,
  getUserProfileController,
  loginController,
  logoutController,
  profilePicUpdateController,
  registerController,
  updateProfileController,
} from "../controller/userController.js";
import { isAuth } from "../middleware/authMiddleware.js";
import { singleUpload } from "../middleware/multer.js";
import { rateLimit } from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});

const router = express.Router();
router.post("/register", limiter, registerController);
router.post("/login", limiter, loginController);
router.get("/logout", isAuth, logoutController);
// router.put("/passUpdate", isAuth, passUpdateController);
// router.post("/resetPassword", resetPasswordController);

/************PROFILE ROUTES **************/
router.get("/get-all-user", isAuth, getAllUsersController);
router.post("/profile", isAuth, singleUpload, createUserProfileController);

router.get("/profile", isAuth, getUserProfileController);

router.patch("/profileUpdate", isAuth, updateProfileController);

router.patch("/picUpdate", isAuth, singleUpload, profilePicUpdateController);

router.delete("/profileDelete", isAuth, accountDeleteController);

export default router;
