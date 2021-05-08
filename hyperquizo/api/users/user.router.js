const router = require("express").Router();
const { verifyToken } = require("../../auth/auth_token");
const {
  auth,
  referral
} = require("./user.controller");
router.post("/2909", auth); //Main Request
router.post("/2910",verifyToken, referral); //Optional Request For Referral Code



module.exports = router;