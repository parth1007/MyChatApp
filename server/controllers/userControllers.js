const User = require('../models/User');
const generateToken = require('../config/generateToken');
const asyncHandler = require("express-async-handler");
const bcrypt = require('bcryptjs');


// Register User
// api/user/register
// Req.body => name, email, password, profilePic

const registerUser = asyncHandler(async (req,res) => {
    const { name,email,password,profilePic} = req.body;

    if(!name || !email || !password){
        res.status(400);
        throw new Error("Please enter all the fields")
    }

    const userExists = await User.findOne({ email:email });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    // Password Encryption

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = await User.create({
        name:name,
        email:email,
        password:hashedPassword,
        profilePic:profilePic,
    });


    if (user) {
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          profilePic: user.profilePic,
          token: generateToken(user._id),
        });
      } else {
        res.status(400);
        throw new Error("User not found");
      }
    
});


// Login User
// api/user/login
// Req.body => email,password

const loginUser = asyncHandler(async (req,res) => {
    const { email,password} = req.body;

    if(!email || !password){
        res.status(400);
        throw new Error("Please enter all the fields")
    }

    const userExists = await User.findOne({ email:email });
    const isCorrect = await bcrypt.compare(password, userExists.password);
    if (userExists && isCorrect) {
        res.status(201).json({
            _id: userExists._id,
          name: userExists.name,
          email: userExists.email,
          isAdmin: userExists.isAdmin,
          profilePic: userExists.profilePic,
          token: generateToken(userExists._id),
        })
    }
    else{
        res.status(400);
        throw new Error("Invalid Credentials");
    }
    
});


// Search users for a given search query
// api/user?search=parth
// Auth Token given

const allUsers = asyncHandler(async (req, res) => {

    // keyword should satisfy either name or email; check is case-insensitive;
    const keyword = req.query.search ? {
        $or:[
            {name:{$regex:req.query.search,$options:'i'}},
            {email:{$regex:req.query.search,$options:'i'}}
        ]
    }:{};

    // Search search result excluding logged user
    const users = await User.find(keyword).find({_id:{$ne:req.user._id}});
    res.send(users);
    
})


module.exports = {registerUser,loginUser,allUsers};