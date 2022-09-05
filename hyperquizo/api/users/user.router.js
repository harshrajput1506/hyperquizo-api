const router = require("express").Router();
const { verifyToken } = require("../../auth/auth_token");

const {
  auth,
  referral,
  login,
  getWallet,
  payQuiz,
  addWallet
} = require("./user.controller");
router.post("/2901",verifyToken, auth); //Main Auth Request
router.post("/2902", verifyToken ,referral); //Optional Request For Referral Code
router.post("/3901",verifyToken,login);
router.get("/3902", getWallet)
router.post("/4901", verifyToken ,payQuiz); //Pool Payment Process
router.post("/4911", verifyToken, addWallet); //Add Balance in Wallet

module.exports = router;