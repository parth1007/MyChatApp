const express = require('express');
const router = express.Router();
const {accessChat,fetchChats,createGroupChat,renameGroup,removeFromGroup,groupAdd} = require('../controllers/chatControllers');
const {accessJwtToken} = require('../middleware/authMiddleware');

router.post('/',accessJwtToken,accessChat);
router.get('/',accessJwtToken,fetchChats);
router.post('/group',accessJwtToken,createGroupChat);
router.put('/rename',accessJwtToken,renameGroup);
router.put('/groupremove',accessJwtToken,removeFromGroup);
router.put('/groupadd',accessJwtToken,groupAdd); 

module.exports = router;