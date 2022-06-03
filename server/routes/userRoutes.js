const express = require('express');
const {registerUser,loginUser,allUsers} = require('../controllers/userControllers');
const router = express.Router();
const {accessJwtToken} = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/',accessJwtToken, allUsers);


module.exports = router;