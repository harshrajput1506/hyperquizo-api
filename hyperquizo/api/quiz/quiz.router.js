const router = require("express").Router();
const {
    getHomeQuizCategory,
  } = require("./quiz.controller");


router.get("/quizcategory", getHomeQuizCategory);





module.exports = router;