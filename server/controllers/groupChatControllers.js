const asyncHandler =  require('express-async-handler');
const User = require('../models/User');
const Chat = require('../models/Chat');

// Access or create a new chat with a given userId
// post :: /api/chat/group
// Auth Token given
// Req.body => group name, users array


const createGroupChat = asyncHandler(async (req,res) => {
    if(!req.body.users || !req.body.name){
        return res.status(400).send({messege:"Please send users and name"});
    }

    // we send array in stringify formet from frontend and parse here
    var users = JSON.parse(req.body.users);
    var groupname = req.body.name;

    if(users.length < 2){
        return res.status(400).send({messege:"Add more users"})
    }

    // add logged user to array
    users.push(req.user);

    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users:users,
            isGroupChat:true,
            groupAdmin: req.user,
        });

        const fullGroupChat = await Chat.findOne({_id: groupChat._id})
            .populate("users","-password")
            .populate("groupAdmin","-password")
            

        res.status(200).json(fullGroupChat);
    } catch (error) {
        res.status(400);
        throw new Error(error.messege);
    }
});


// Rename a group chat
// put :: /api/chat/rename
// Auth Token given
// Req.body => chatId, new name 


const renameGroup = asyncHandler(async (req,res) => {
    const {chatId,chatName} = req.body;


    try {
        const updatedChat = await Chat.findByIdAndUpdate(    
            chatId,
        {
            chatName: chatName,
        },{
            new:true,
        })
        .populate("users","-password")
        .populate("groupAdmin","-password")
            

        res.status(200).json(updatedChat);
    } catch (error) {
        res.status(400);
        throw new Error(error.messege);
    }
})


// Remove a user from group chat
// put :: /api/chat/groupremove
// Auth Token given
// Req.body => chatId, userId 


const removeFromGroup = asyncHandler(async (req,res) => {
    const {chatId,userId} = req.body;

    try {
        const updatedChat = await Chat.findByIdAndUpdate(
            chatId,
            {
            $pull:{
                users:userId
            }
        },{
            new:true,
        })
        .populate("users","-password")
        .populate("groupAdmin","-password")
            

        res.status(200).json(updatedChat);
    } catch (error) {
        res.status(400);
        throw new Error(error.messege);
    }
})

// Add a user to group chat
// put :: /api/chat/groupadd
// Auth Token given
// Req.body => chatId, userId 



const groupAdd = asyncHandler(async (req,res) => {
    const {chatId,userId} = req.body;

    try {
        const updatedChat = await Chat.findByIdAndUpdate(
            chatId,
        {
            $push:{
                users:userId
            }
        },{
            new:true,
        })
        .populate("users","-password")
        .populate("groupAdmin","-password")
            

        res.status(200).json(updatedChat);
    } catch (error) {
        res.status(400);
        throw new Error(error.messege);
    }
});



module.exports = {createGroupChat,renameGroup,removeFromGroup,groupAdd};