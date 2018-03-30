const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// GET Guides
router.get('/guides', (req, res) => {
    res.render('guides');
});

// GET Links
router.get('/links', (req, res) => {
    res.render('links');
});

// GET Podcasts
router.get('/podcasts', (req, res) => {
    res.render('podcasts');
});

// GET Videos
router.get('/videos', (req, res) => {
    res.render('videos');
});

module.exports = router;
