const {
  getUserCode,
  getUserEmail,
  getUsername,
  loginProcess,
  getWalletProcess,
  addwalletBalance,
  insertTransactions
} = require("./user.service");
const { authProcess } = require("./auth");
const { referralProcess } = require("./referral");
const { poolPayProcess } = require("./pool.payment");



module.exports = {

  auth: (req, res) => {
    const data = req.body;
    authProcess(data, (err, results, message) => {
      if (err) {
        console.log(err);
        const errors = err;
        return res.status(500).json({
          success: 0,
          message: "Database connection errror : ", errors
        });
      }
      if (results) {
        if (message === "Login") {
          return res.status(200).json({
            success: 1,
            message: message,
            data: results
          });
        } else {
          return res.status(201).json({
            success: 1,
            message: message,
            data: results
          });
        }
      } else {
        return res.status(400).json({
          success: 0,
          message: "Something Went Wrong"
        });

      }

    });
  },


  referral: (req, res) => {
    const data = req.body;
    referralProcess(data, (err, results) => {
      if (err) {
        console.log(err);
        const errors = err;
        return res.status(500).json({
          success: 0,
          message: "Database connection errror : ", errors
        });
      }
      if (results) {
        const msg = "Invalid Referral Code"
        if (results == msg) {
          return res.status(404).json({
            success: 0,
            message: msg
          });
        } else {
          const msg = results;
          return res.status(201).json({
            success: 1,
            message: msg
          });

        }


      } else {
        return res.status(400).json({
          success: 0,
          message: "Something Went Wrong"
        });

      }

    });
  },

  login: (req, res) => {
    const body = req.body;
    loginProcess(body.uid, (err, results) => {
      if (err) {
        console.log(err);
        const errors = err;
        return res.status(500).json({
          success: 0,
          message: "Database connection errror : ", errors
        });
      }
      if (results) {
        return res.status(200).json({
          success: 1,
          data: results,

        });

      } else {
        return res.status(404).json({
          success: 0,
          message: "Not Found",
          results
        });
      }

    });

  },

  getWallet: (req, res) => {
    const uid = req.query.uid;
    getWalletProcess(uid, (err, results) => {
      if (err) {
        console.log(err);
        const errors = err;
        return res.status(500).json({
          success: 0,
          message: "Database connection errror : ", errors
        });
      }
      if (results) {
        return res.status(200).json({
          success: 1,
          data: results,

        });

      } else {
        return res.status(404).json({
          success: 0,
          message: "Not Found"
        });
      }
    });
  },

  //Controller for Add WallletBalance
  addWallet: (req, res) => {
    const body = req.body;
    addwalletBalance(body,(err, results) => {
      if (err) {
        console.log(err);
        const errors = err;
        return res.status(500).json({
          success: 0,
          message: "Database connection errror", errors
        });
      };
      let message;
      if(results.changedRows==1){
        // Insert Transaction Records
        
        insertTransactions(body,(err, results) => {
          if(err){
            console.log(err);
            return res.status(500).json({
              success:0,
              message:"Database Connection Error",err
            });         
          }          
        });
        message = "Balance Added Successfuly"
        return res.status(200).json({
          success:1,
          data: message
        });
      } else {
        message = "Balance Added Failed";
        return res.status(200).json({
          success:0,
          data: message
        });
      };

    });
  },


  payQuiz: (req, res) => {
    const body = req.body;
    poolPayProcess(body, (err, results) => {
      if (err) {
        console.log(err);
        const errors = err;
        return res.status(500).json({
          success: 0,
          message: "Database connection errror", errors
        });
      }
      if (results) {
        return res.status(200).json({
          success: 1,
          data: results,

        });

      } else {
        return res.status(404).json({
          success: 0,
          message: "Not Found"
        });
      }
    });
  },


  //Other COntrollers
  registerProcess: (req, res) => {
    const data = req.body;
    register(data, (err, results) => {
      if (err) {
        console.log(err);
        const errors = err;
        return res.status(500).json({
          success: 0,
          message: "Database connection errror : ", errors
        });
      }
      if (results) {
        if (results === "Unauthorised") {
          return res.status(401).json({
            success: 0,
            message: "Unauthorised"
          });
        } else {
          return res.status(201).json({
            success: 1,
            message: "User Registered",
            data: results
          });

        }


      }
      return res.status(400).json({
        success: 0,
        message: "Something Went Wrong"
      });
    });
  },

  checkData: (req, res) => {
    const body = req.body;
    checkDetails(body, (err, message) => {
      if (err) {
        console.log(err);
        const errors = err;
        return res.status(500).json({
          success: 0,
          message: "Database connection errror : ",
          errors
        });
      }
      if (!message) {
        return res.status(400).json({
          success: 0,
          message: "Error",

        });

      } else {
        if (message == "Success") {
          return res.status(200).json({
            success: 1,
            message: message,
          });

        } else {
          return res.status(404).json({
            success: 0,
            message: message,
          });

        }



      }

    });
  },
  google: (req, res) => {
    const body = req.body;
    getUID(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (results) {
        return res.status(200).json({
          success: 1,
          message: "User Registered"

        });

      } else {
        return res.status(404).json({
          success: 0,
          message: "User Not Found"

        });
      }

    });
  },
  checkEmail: (req, res) => {
    const body = req.body;
    getUserEmail(body, (err, results) => {
      if (err) {
        console.log(err);
        const errors = err;
        return res.status(500).json({
          success: 0,
          message: "Database connection errror : ", errors
        });
      }
      if (!results) {
        return res.status(404).json({
          success: 1,
          message: "Email Not Found"

        });

      } else {
        return res.status(200).json({
          success: 0,
          message: "Email Registered"

        });
      }

    });
  },
  checkCode: (req, res) => {
    const body = req.body;
    getUserCode(body, (err, results) => {
      if (err) {
        console.log(err);
        const errors = err;
        return res.status(500).json({
          success: 0,
          message: "Database connection errror : ", errors
        });
      }
      if (results) {
        return res.status(404).json({
          success: 1,
          message: "Refer Code Valid",
          results
        });

      } else {
        return res.status(200).json({
          success: 0,
          message: "Refer Code InValid",
          results
        });
      }

    });
  },
  checkNewCode: (req, res) => {
    const body = req.body.referCode;
    getUserNewCode(body, (err, results) => {
      if (err) {
        console.log(err);
        const errors = err;
        return res.status(500).json({
          success: 0,
          message: "Database connection errror : ", errors
        });
      }
      if (!results) {
        return res.status(404).json({
          success: 1,
          message: "Refer Code Not Available",
          results
        });

      } else {
        return res.status(200).json({
          success: 0,
          message: "Refer Code Available",
          results
        });
      }

    });
  },
  checkUsername: (req, res) => {
    const body = req.body;
    getUsername(body, (err, results) => {
      if (err) {
        console.log(err);
        const errors = err;
        return res.status(500).json({
          success: 0,
          message: "Database connection errror : ", errors
        });
      }
      if (!results) {
        return res.status(404).json({
          success: 1,
          message: "Username Not Available",
          results
        });

      } else {
        return res.status(200).json({
          success: 0,
          message: "Username Available",
          results
        });
      }

    });
  },
};
