const router = require("express").Router();
const {
    getHomeQuizCategory,
  } = require("./quiz.controller");


router.get("/quizcategories", getHomeQuizCategory);





module.exports = router;