const express = require("express");
const dotenv = require("dotenv");
const chats = require("./data/data");
const connectMongoDb = require("./config/db");
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')
const messageRoutes = require('./routes/messageRoutes')
const path = require("path");

const app = express();
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
var cors = require('cors')



dotenv.config();
connectMongoDb();

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors()) ;


// app.get('/',(req, res) => {
//     res.send('Hello World');
// })

app.use('/api/user',userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);




	// --------------------------deployment------------------------------

  // const __dirname1 = path.resolve();

	const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  
    app.use("/", express.static(path.join(__dirname1, "../client/build")));

} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}
  
  // --------------------------deployment------------------------------

app.use(notFound);
app.use(errorHandler);

const server = app.listen(PORT, console.log(`Listening on port ${PORT}`));


// ***************** Socket.io Logic ***************** //


const io = require("socket.io")(server, {

    // the amount of time it will while being active
    // If user will not be active for 60 seconds it close connection to save bandwidth
    pingTimeout: 60000,
    cors: {
      origin: "http://localhost:3000",
      // credentials: true,
    },
  });
  
  io.on("connection", (socket) => {
    console.log("Connected to socket.io");
    socket.on("setup", (userData) => {
      socket.join(userData._id);
      socket.emit("connected");
    });
  
    socket.on("join chat", (room) => {
      socket.join(room);
      console.log("User Joined Room: " + room);
    });
    
    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
  
    // send to all users in the chat room except ourself

    socket.on("new message", (newMessageRecieved) => {
      var chat = newMessageRecieved.chat;
  
      if (!chat.users) return console.log("chat.users not defined");
  
      chat.users.forEach((user) => {
        if (user._id == newMessageRecieved.sender._id) return;
  
        socket.in(user._id).emit("message recieved", newMessageRecieved);
      });
    });
  
    socket.off("setup", () => {
      console.log("USER DISCONNECTED");
      socket.leave(userData._id);
    });
  });