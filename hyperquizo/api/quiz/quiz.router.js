const router = require("express").Router();
const {
    getHomeQuizCategory, getQuizPool
  } = require("./quiz.controller");


router.get("/topics", getHomeQuizCategory);
router.get("/getQuizPool", getQuizPool)

module.exports = router;