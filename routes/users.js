const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/userController');

router.get('/signup', userController.signup);
router.get('/signin', userController.signIn);
router.get('/forgot-password', userController.forgot);
router.get('/reset-password/:token', userController.reset);

router.post('/forgot-password', userController.forgotPassword);
router.post('/reset-password', userController.resetPassword);

router.post('/create-user', userController.create);

router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/signin'},) , userController.createSession);

router.get('/sign-out', userController.destroySession);

router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/signin'}), userController.createSession);

module.exports = router; 