const router = require("express").Router();
const {
    getHomeQuizCategory,
  } = require("./quiz.controller");


router.get("/topics", getHomeQuizCategory);

module.exports = router;