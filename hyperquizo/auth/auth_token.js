const admin = require("firebase-admin");
const serviceAccount = require("../../securityAccount.json");

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
            const reqUID = req.body.uid;
            admin.auth().verifyIdToken(token)
                 .then(function(decodedToken) {
                 let uid = decodedToken.uid;
                     if (uid === reqUID) {
                      next();                                                                    
                     }
                     else { 
                        return res.status(401).json({
                            success: 0,
                            message: "Access Denied! Unauthorized User"
                          });
                     }
                 }).catch(function(error) {
                    return res.status(400).json({
                        success: 0,
                        message: "Invalid Token...",
                        authToken: token,
                        error: error 
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
