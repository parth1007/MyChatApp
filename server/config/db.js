const mongoose  = require("mongoose");

const connectMongoDb = async () =>{
    try{
        const connected = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Connected to ${connected.connection.host}`);
    }catch(err){
        console.log(err);
        process.exit();
    }
}

module.exports = connectMongoDb;