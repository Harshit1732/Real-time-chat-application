const express = require('express');

const router= express.Router();
const user= require('../controller/usercontroller');
const auth= require('../middleware/auth')

router.post('/signup',user.createuser)
router.post('/login',user.login)

router.get('/getAllusers',auth.protect, user.getAllusers);

router.get('/searchUser',auth.protect, user.searchUser);


module.exports= router;