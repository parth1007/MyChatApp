const asyncHandler =  require('express-async-handler');
const User = require('../models/User');
const Chat = require('../models/Chat');


// Access or create a new chat with a given userId
// post :: /api/chat/
// Auth Token given
// Req.body => userId


const accessChat = asyncHandler(async (req,res) => {
    const {userId} = req.body;
    if(!userId){
        console.log("UserId param not send with the request");
        return res.sendStatus(400);
    }

    var isChat = await Chat.find({
        isGroupChat:false,
        $and:[
            {users:{$elemMatch:{$eq:req.user._id}}},
            {users:{$elemMatch: {$eq:userId}}},
        ]
    }).populate("users","-password")
      .populate("latestMessage");

      isChat = await User.populate(isChat,{
          path: "latestMessage.sender",
          select: "name ProfilePic email",
      });

      if(isChat.length > 0) {
          res.send(isChat[0]);
      }
      else{
          var chatData = {
              chatname: "sender",
              isGroupChat:false,
              users: [req.user._id,userId],
          };

        try {
            const createdChat = await Chat.create(chatData);

            const FullChat = await Chat.findOne({_id: createdChat._id}).populate(
                "users","-password"
            );
            res.status(200).send(FullChat);

        } catch (error) {
            res.status(400);
            throw new Error(error.messege);
        }
      }  
})


// Fetch all the chats of logged user
// get :: /api/chat/
// Auth Token given


const fetchChats = asyncHandler(async (req,res) => {
    try {
        Chat.find({
            users:{$elemMatch:{$eq:req.user._id}}
        })
        .populate("users","-password")
        .populate("groupAdmin","-password")
        .populate("latestMessage")
        .sort({updatedAt:-1})
        .then(async(results) =>{
            results = await User.populate(results,{
                path: "latestMessage.sender",
                select:"name profilePic email"
            })
            res.status(200).send(results);
        })
        
    } catch (error) {
        res.status(400);
        throw new Error(error.messege);
    }
})




module.exports = {accessChat,fetchChats};