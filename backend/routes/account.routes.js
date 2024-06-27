const express = require('express');
const router = express.Router();
const authMiddleware = require("../middleware/auth.middlewares");
const { getBalance, transferMoney } = require('../controllers/account.controllers');


router.get("/balance", authMiddleware, getBalance);
router.post("/transfer", authMiddleware, transferMoney);



module.exports = router;