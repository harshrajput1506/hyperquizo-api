const mysql = require("../../config/database");
module.exports = {

    getQuizContests: (callback) => {
        mysql.query('Select * from contests', [], (error, results, fields)=>{
            if(error){
                callback(error);
            }
            const data = results;  //Array
            let contestTitle = [];
            let contestIcon = [];
            let contestPrize = [];
            let contestEntry = [];
            let contestStartTime = [];
            let contestEndTime = [];
            let contestStatus = [];
            let contestSpots = [];
            let contestTotalSpots = [];
            let contestWinners = [];
            let contestCategory = [];

            const categories = ['Mega Contest', 'Head To Head', 'Winner Takes All', 'Contest For Champions', 'More Contests'];
            for(let i = 1;i <= categories.length; i++){
                var Title = [];
                var Icon = [];
                var Prize = [];
                var Entry = [];
                var StartTime = [];
                var EndTime = [];
                var Status = [];
                var Spots = [];
                var TotalSpots = [];
                var Winners = [];
                var Category = [];
                data.forEach(element => {
                    if(element.category == i){
                        Title.push(element.title);
                        Icon.push(element.icon);
                        Prize.push(element.prizePool);
                        Entry.push(element.entryFee);
                        StartTime.push(element.startTime);
                        EndTime.push(element.endTime);
                        Status.push(element.status);
                        Spots.push(element.spots);
                        TotalSpots.push(element.totalSpots);
                        Winners.push(element.winners);
                        Category.push(categories[i-1]);
                    }                    

                });
                    contestSpots.push(Spots);
                    contestEndTime.push(EndTime);
                    contestStartTime.push(StartTime);
                    contestStatus.push(Status);
                    contestTitle.push(Title);
                    contestTotalSpots.push(TotalSpots);
                    contestPrize.push(Prize);
                    contestWinners.push(Entry);
                    contestIcon.push(Icon);
                    contestCategory.push(Category);
                

            }
            const subName = ['Get ready for mega winnings!','The Ultimate Face Off','Eveything To Play For', 'High Entry Fees, Intense Competitions','Keep Winning!'];
            const startCards = [1,3,3,2,3]
            const contest = {
                CategoriesName: categories,
                SubName: subName,
                StartCards: startCards,
                Title: contestTitle,
                Icon: contestIcon,
                EntryFee: contestEntry,
                Category: contestCategory,
                PrizePool: contestPrize,
                Spots: contestSpots,
                TotalSpots: contestTotalSpots,
                StartTime: contestStartTime,
                EndTime: contestEndTime,
                Status: contestStatus,
                Winners: contestWinners
            }
            return callback(null,contest);


        });

    },

};