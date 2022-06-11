const express = require('express');
const router = express.Router();
const {accessJwtToken} = require('../middleware/authMiddleware');
const {sendMessage,allMessage} = require('../controllers/messageControllers');


// for sending message
router.post("/",accessJwtToken,sendMessage)

// get all messages
router.get("/:chatId",accessJwtToken,allMessage)



module.exports = router;