const express = require("express");
const router = express.Router();
const { signUpHandler, loginHandler, updateUser, getUser } = require("../controllers/user.controller");
const authMiddleware = require("../middleware/auth.middlewares");

router.post("/signup", signUpHandler);
router.post("/login", loginHandler);
router.put("/", authMiddleware, updateUser);
router.get("/bulk", getUser);

module.exports = router;