const mysql = require("../../config/database");
const { loginProcess, loginNumberProcess } = require("./login.service");
const { register } = require("./register.service");
const { getUserbyID, getUserNumber } = require("./user.service");

module.exports = {

    authProcess: (data, callBack) => {
        getUserbyID(data.uid, (err, results) => {
            if(err){
                callBack(err);
            }
            if(results){
                //Login Process
                loginProcess(data.uid,(err, results) =>{
                    if(err){
                        callBack(err);
                        
                    }
                    if(results){
                        const msg = "Login";
                        return callBack(null, results, msg);
                    }

                });
            }
            else{
                if(data.number == ""){
                //Register Process
                    register(data, (err, results) =>{
                        if(err){
                        callBack(err);
                        }
                    return callBack(null, results, "Register")

                    });

                }else {
                    getUserNumber(data.number, (err, results) =>{
                        if(err){
                            callBack(err)
                        }
                        if(results){
                            //Login Process By Number
                            loginNumberProcess(data.number, (err, results)=>{
                                if(err){
                                    callBack(err)
                                }
                                if(results){
                                    const msg = "Login";
                                    return callBack(null, results, msg);
                                }
                            });
                        }else{
                            //Register Process
                    register(data, (err, results) =>{
                        if(err){
                        callBack(err);
                        }
                    return callBack(null, results, "Register")

                    });

                        }

                    });
                }
                
                
            }


        });

    },
};