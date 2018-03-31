const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// GET About
router.get('/about', (req, res) => {
    res.render('about');
});

// GET Mission
router.get('/mission', (req, res) => {
    res.render('mission');
});

// GET Contact
router.get('/contact', (req, res) => {
    res.render('contact');
});


// GET Constition
router.get('/constitution', (req, res) => {
    res.render('constitution');
});

module.exports = router;