const mysql = require("../../config/database")
const { getQuizContests } = require("./contest")
module.exports = {
    getQuizCategory: (callback) => {
        mysql.query('select * from quizCategory', [], (error, results, fields) => {
            if(error){
                callback(error);
            }
            const data = results;  //Array
            let mainCategory = [];
            let subCategory = [];
            let blitzCategory = [];
            let liveBlitzCategory = [];
            let practiceModeCategory = [];
            let PWFCategory = [];
            function getSubCategories(data, id){
                let sub = [];             
                data.forEach(element => {                  
                    if(element.parentID == id){
                        sub.push(element);
                    }
                });
                subCategory.push(sub);

              

            }
            function getOtherCategories(data){
                data.forEach(element => {
                    if(element.blitzMode == 1){
                        blitzCategory.push(element);
                    } 
                    if(element.practiceMode == 1){
                        practiceModeCategory.push(element);
                    }
                    if(element.live == 1){
                        liveBlitzCategory.push(element);
                    }
                    if(element.PWFMode == 1){
                        PWFCategory.push(element);
                    }
                });
            }
            function getMainCategories(data){
                data.forEach(element => {
                    if(element.parentID == 0){
                        mainCategory.push(element);
                        const id = element.id;
                        getSubCategories(data, id);
                        
    
                    }
                });
            }
            getMainCategories(data);
            getOtherCategories(data);
            getQuizContests((err, results)=>{
                if(err){
                    callback(err);
                }
                const result = {
                    MainCategory: mainCategory,
                    SubCategory: subCategory,
                    BlitzCategory: blitzCategory,
                    LiveBLitzCategory: liveBlitzCategory,
                    PracticeCategory: practiceModeCategory,
                    PWFCategory: PWFCategory,
                    QuizContest: results
                };
                callback(null, result)


            });
            
            
            

        });
    }

};