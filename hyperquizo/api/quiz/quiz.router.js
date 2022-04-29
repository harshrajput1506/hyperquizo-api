const router = require("express").Router();
const { verifyUid } = require("../../auth/verify_uid")
const {
    getHomeQuizCategory, getQuizPool
  } = require("./quiz.controller");


router.get("/topics", verifyUid, getHomeQuizCategory);
router.get("/getQuizPool", verifyUid, getQuizPool)

module.exports = router;