const express = require('express');
const router = express.Router();
const verifyJwt = require('../middleware/auth.middleware.js');
const {handleUserRegistration,handleUserLogout,handleGetCurrentUser,handleUserLogin} = require('../controller/user.controller.js');


// user related routes
router.post('/register',handleUserRegistration);
router.post('/login',handleUserLogin);
router.post("/logout",verifyJwt,handleUserLogout)
router.get('/current',verifyJwt,handleGetCurrentUser);


module.exports = router;