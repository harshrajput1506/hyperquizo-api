const router = require("express").Router();
const { verifyToken } = require("../../auth/auth_token");
const {
  auth,
  referral,
  login
} = require("./user.controller");
router.post("/2901", verifyToken, auth); //Main Auth Request
router.post("/2902",verifyToken, referral); //Optional Request For Referral Code
router.post("/3901", login);



module.exports = router;