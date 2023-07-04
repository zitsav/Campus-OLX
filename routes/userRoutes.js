const express = require("express");
const { protect } = require("../middleware/authentication");
const { allUsers } = require("../controllers/searchController");
const { updateUser, getCurrentUserProfile, uploadProfilePicture } = require("../controllers/userController");
// const uploadUserPhoto = require("../middleware/uploadUserPhoto");
const {authUser,logoutUser} = require("../controllers/sessionController");
const {
  registerUser,
  verifyCode,
  resetPassword,
  forgotPassword,
  deleteUser,
  refreshExpiredToken
} = require("../controllers/authController");

const router = express.Router();

// @TODO move these routes to authRoutes
router.route("/").post(registerUser);
router.route("/verify").post(verifyCode);
router.route("/forgotpassword").post(forgotPassword);
router.route("/reset").post(resetPassword);
router.delete("/:id",protect, deleteUser);

// @TODO move these routes to sessionRoutes
router.post("/logout",protect,logoutUser);
router.post("/login", authUser);


// @TODO these ones stay here
router.put('/updateProfile/:id', protect, updateUser);
router.get("/profile",protect,getCurrentUserProfile);
router.post("/upload", protect, uploadProfilePicture)
router.route("/").get(protect, allUsers);

module.exports = router;
