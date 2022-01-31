const mysql = require("../../config/database");
const { register } = require("./register.service");
const { getUserNumber, getUserEmail, loginProcess } = require("./user.service");

module.exports = {

    authProcess: (data, callBack) => {
        let uid;

        // Check Phone Number Auth or not
        if (!data.number == ""){
            // Phone Number Auth Process
            getUserNumber(data.number,(err, results)=>{
                if(err){
                    callBack(err);
                }
                if(results){
                    uid = results.uid;
                    // Login Process (Phone Number Login)
                    loginProcess(uid,(err, results)=>{
                        if(err){
                            callBack(err);
                        }
                        if(results){
                            const msg = "Login"
                            return callBack(null, results, msg);
                        }
                    });
                } else{
                    // Register Process (Phone Number)
                    register(data, (err, results) =>{
                        if(err){
                            callBack(err);
                        }
                        return callBack(null, results, "Register")
                    });
                }
            });
        } else{
            // Google Auth Process
            getUserEmail(data.email, (err, results)=>{
                if(err){
                    callBack(err)
                }
                if(results){
                    uid = results.uid;
                    // Login Process (Google)
                    loginProcess(uid,(err, results)=>{
                        if(err){
                            callBack(err);
                        }
                        if(results){
                            const msg = "Login"
                            return callBack(null, results, msg);
                        }
                    });
                }else{
                    // Register Process (Google)
                    register(data, (err, results) =>{
                        if(err){
                            callBack(err);
                        }
                        return callBack(null, results, "Register")
                    });

                }
            });
        }
    },
};