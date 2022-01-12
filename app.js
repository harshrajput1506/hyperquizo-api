require("dotenv").config();
const express = require("express");
const helmet = require('helmet');
const app = express();
const morgan = require('morgan');
var path = require('path');

// Declare Routers
const userRouter = require("./hyperquizo/api/users/user.router");
const quizRouter = require("./hyperquizo/api/quiz/quiz.router");


app.use(morgan("dev"));


app.use(express.json());
app.use(helmet.noSniff());
app.use(express.static(path.join(__dirname, 'public')))

// Intialize Routers
app.use("/hyperquizo/api/v1/users", userRouter);
app.use("/hyperquizo/api/v1/quiz", quizRouter);


//Handle Errors
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    success: 0,
    error: {
      message: error.message
    }
  })
});

//Running Port
const port = process.env.APP_PORT || 5000 ;
app.listen(port, () => {
  console.log("server up and good running on PORT :", port);
});
