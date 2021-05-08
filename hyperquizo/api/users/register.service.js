const mysql = require("../../config/database");





module.exports = {
    
     
    register: (data, callBack) => {

      let referralCode = '';
      let username = '';
      
      mysql.query('select referCode, userName from Users', [], function (error, results, fields) {
        if(error){
          callBack(error);
        }
        if(results){
          referralCode = generateCode(results);
          username = generateUsername(results);
          mysql.query(
            'insert into `Users` (uid, name, userName, email, number, upi, DOB, gender, state, amount, cashBonus, withdrawCash, depositCash, winningCash, totalWinning, contestsPlayed, contestsWon, contestsLost, referCode, friendCode, onesignalID, status, joinings, level , totalXP, XP, withdrawTimestamp, kycStatus, address, profilePicture) values(?,?,?,?,?,"","","","",0,0,0,0,0,0,0,0,0,?,"",?,"Active",0,1,40,0,0,"false","",?)',
            [
              data.uid,
              data.name,
              username,
              data.email,
              data.number,
              referralCode,
              data.onesignalID,
              data.profilePicture
      
            ],
            (error, results, fields) => {
              if (error) {
                callBack(error);
              }
              const data = {
                referCode: referralCode,
                userName: username
              }
              return callBack(null, data);
            
            });
                   
        } 
      });

      function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
      }

      function generateUsername(results){
        const num = getRndInteger(1,999999);
        let userName = "user"+num;
        let nameIsExist = false;
        results.forEach(element => {
          if(userName == element.userName){
            nameIsExist = true;
          }
        });
        if(nameIsExist){
          return generateUsername(results);
        }else{
          return userName;
        }
        
      }


      function generateCode(results){
        const alpha = ['A','B','C','D','E','F','G','H','I','G','K','L','M','N','O','Q','P','R','S','T','U','V','W','X','Y','Z','1','2','3','4','5','6','7','8','9','0'];
        let Code = alpha[getRndInteger(0,25)]+alpha[getRndInteger(0,25)]+alpha[getRndInteger(0,35)]+alpha[getRndInteger(26,35)]+alpha[getRndInteger(0,25)];
        const num = getRndInteger(11,99);       
        Code = Code+num;
        let codeIsExist = false;
        results.forEach(element => {
          if(Code == element.referCode){
            codeIsExist = true;         
          }     
        });
        if(codeIsExist){
          return generateCode(results);
        }else{
          return Code;
        }       
      }
     
      
     
        
      },
     
};