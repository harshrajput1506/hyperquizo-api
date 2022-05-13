const admin = require("firebase-admin");
const serviceAccount = require("../../securityAccount.json");
const { checkUserTokens, setUserTokens } = require("../api/users/user.service");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://quiz-a192b.firebaseio.com"
});
module.exports = {


  verifyToken: (req, res, next) => {
    let token = req.get("authorization");
    if (token) {
      // Remove Bearer from string
      token = token.slice(7);
      admin.auth().verifyIdToken(token)
        .then(function (decodedToken) {
          let uid = decodedToken.uid;
          if (uid == req.body.uid){
            next();
            /*checkUserTokens(token, (err, message) => {
              if(err){
                console.log(err);
                const errors = err;
                return res.status(500).json({
                  success: 0,
                  message: "Database connection errror : ", errors
                });
              }
              if(message == "Already Used"){
                return res.status(401).json({
                  success: 0,
                  message: "Access Denied! Unauthorized User Error 1"
                });
              }else{
                data = {token: token, time: decodedToken.iat}
                setUserTokens(data, (err, message) =>{
                  if (err) {
                    console.log(err);
                    const errors = err;
                    return res.status(500).json({
                      success: 0,
                      message: "Database connection errror : ", errors
                    });
                  }
                  if(message == "Token Stored"){
                    next();
                  }else{
                    return res.status(401).json({
                      success: 0,
                      message: "Access Denied! Unauthorized User Error 2"
                    });
                  }

                });
              }

            });*/
          }else{
            return res.status(401).json({
              success: 0,
              message: "Access Denied! Unauthorized User"
            });
          }
          
        }).catch(function (error) {
          return res.status(400).json({
            success: 0,
            message: "Invalid Token...",
          });
        });

    } else {
      return res.status(401).json({
        success: 0,
        message: "Access Denied! Unauthorized User"
      });
    }
  }
};
