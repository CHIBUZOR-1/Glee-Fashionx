const express = require('express');
const userRouter = express.Router();
const {userRegisteration, userLogin, logout, testController, allUsers, updateUserRole, emailVerification, deleteUser, updateProfile, forgotPassword, resetPassword} = require('../Controllers/AuthController');
const {verifyToken, isAdmin} = require('../Utilities/Auth');

userRouter.post('/register', userRegisteration);
userRouter.post('/login', userLogin);
userRouter.get('/logout', logout);
userRouter.get('/all_users', verifyToken, isAdmin,  allUsers);
userRouter.get('/test', verifyToken, isAdmin, testController);
userRouter.put('/update-user/:id', verifyToken, isAdmin, updateUserRole);
userRouter.post('/forgot-password', forgotPassword);
userRouter.post('/reset-password/:token', resetPassword);
userRouter.get('/verify-email/:token', emailVerification)
userRouter.delete('/delete_user/:id', verifyToken, isAdmin, deleteUser);

module.exports = userRouter;
