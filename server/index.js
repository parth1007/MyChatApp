const express = require("express");
const dotenv = require("dotenv");
const chats = require("./data/data");
const connectMongoDb = require("./config/db");
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')
const app = express();
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
var cors = require('cors')



dotenv.config();
connectMongoDb();

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors()) ;


app.get('/',(req, res) => {
    res.send('Hello World');
})

app.use('/api/user',userRoutes);
app.use("/api/chat", chatRoutes);

app.use(notFound);
app.use(errorHandler);
// app.use(chatRoutes);

app.listen(PORT, console.log(`Listening on port ${PORT}`));
