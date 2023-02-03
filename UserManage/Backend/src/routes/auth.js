const express = require('express')
const controllers = require('../controller/authController');
const router=express.Router();
const authenticatoken = require('../middleWare/authentication')


function tmp(req,res){};

router.post('/signup',controllers.signup);
router.get('/getAll',authenticatoken,controllers.getAll);


// router.get('getByName/:name',controllers.getAll);
router.post('/login',controllers.login);
router.post('/resetPassword',controllers.resetPassword);
router.get('/refresh',controllers.refresh);
router.post('/logout',controllers.LogOut);
router.put('/updatePassword',controllers.updatePassword);
router.put('/updateUser',controllers.UpdateUser);
router.delete('/deleteUser/:id',controllers.DeleteUser);

module.exports=router;