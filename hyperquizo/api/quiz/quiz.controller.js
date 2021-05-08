const {
    getQuizCategory,
  } = require("./quizcategory");
 

  module.exports = {

    getHomeQuizCategory: (req, res) => {
        getQuizCategory((err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          if(results){
            return res.status(200).json({
              success: 1,
              data: results
            });
          }else {
            return res.status(404).json({
              success: 0,
              message: "Not Found"
            });

          }
          
        });
      },
    


  };