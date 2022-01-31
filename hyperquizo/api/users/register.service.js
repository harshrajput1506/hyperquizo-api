const mysql = require("../../config/database");

module.exports = {
    
    register: (data, callBack) => {

      // Variables
      let referralCode = '';
      let username = '';
      const uid = data.uid;
      
      // Get Username & referCode for Generate NewOne
      mysql.query('select referCode, username from users', [], function (error, results, fields) {
        if(error){
          callBack(error);
        }
        if(results){
          // Generated referCode & Username
          referralCode = generateCode(results);
          username = generateUsername(results);

          // Register Process - Insert Query in users table
          mysql.query(
            'insert into `users` (uid, name, username, email, number, upiID, DOB, gender, state,'
               + 'referCode, friendCode,' 
               + 'profilePicture, address)' 
               + 'values(?,?,?,?,?,"","","","",?,"",?,"")',
            [
              uid,
              data.name,
              username,
              data.email,
              data.number,
              referralCode,
              data.profilePicture
      
            ],
            (error, results, fields) => {
              if (error) {
                callBack(error);
              }
              const data = {
                uid: uid,
                referCode: referralCode,
                username: username
              }
              return callBack(null, data);
            
            });
            // ---------End Register Process -----------
                   
        } 
      });

      // Generate Random Integer
      function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
      }

      // Generate New Username
      function generateUsername(results){
        const num = getRndInteger(1,999999);
        let userName = "user"+num;
        let nameIsExist = false;
        results.forEach(element => {
          if(userName == element.username){
            nameIsExist = true;
          }
        });
        if(nameIsExist){
          return generateUsername(results);
        }else{
          return userName;
        }
        
      }

      // Generate New referCode
      function generateCode(results){
        const alpha = ['A','B','C','D','E','F','G','H','I','G','K','L','M','N','O','Q','P','R','S','T','U','V','W','X','Y','Z','1','2','3','4','5','6','7','8','9','0'];
        let Code = alpha[getRndInteger(0,25)]+alpha[getRndInteger(0,25)]
        +alpha[getRndInteger(0,35)]+alpha[getRndInteger(26,35)]+alpha[getRndInteger(0,25)];
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