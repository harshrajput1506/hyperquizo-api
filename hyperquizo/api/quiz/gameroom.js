const admin= require('firebase-admin');
const db = admin.firestore();

module.exports = {

    getRoomByPoolID: async function(roomID, callback) {
        if(roomID){
            //Room Created
            results = {roomID}
           
        } else {
            //Room Not Create
            results=null;
        } 
        
        return callback(null, results);
    },

    updateExistingRoom: async (data,roomID,callback) => {
        const rooms = db.collection('gameRooms');
        const updateData = {
            player2name: data.name,
            player2picture: data.profilePicture,
            player2id: data.uid,
            status: "Live",
            playersJoined: 2,
            player2status: "Online",
            player2points: 0
        };
        try {
            const update = await rooms.doc(roomID).update(updateData);
            console.log('Update: ', update);
            return callback(null, "Updated Room")
        } catch (error) {
            if(error.code==5){
                return callback("No Matching Documents", null)
            } else {
                return callback("Something Wrong", null)
            }    
        }  
    },

    createNewRoom: async (data, questionSet,callback) => {
        const rooms = db.collection('gameRooms');

        const roomToken = Math.floor(Math.random() * (99999999 - 11111) ) + 11111;
        const addData = {
            roomToken: roomToken,
            player1id: data.uid,
            player1name: data.name,
            player2name: null,
            player2id: null,
            player2picture: null,
            player1picture: data.profilePicture,
            playersJoined: 1,
            entryFee: data.entryFee,
            prizePool: data.prizePool,
            questionSet: questionSet,
            poolID: data.poolID,
            player1status: "Live",
            status: "Open",
            winnerStatus: "Pendning",
            player1points: 0,
            player2points: 0,
            winner: null
        };
        try {
            const add = await rooms.add(addData);
            const roomId = add.id;
            return callback(null, roomId)
        } catch (error) {
            return callback("Something Wrong")
        }
        
    },

};
