const express = require('express');
const router = express.Router();
const { User, Favorite } = require('../models')

router.get('/', (req, res) => {
    User.findAll().then(userData => {
        const hbsData = userData.map(userData => userData.get({ plain: true }))
        // console.log("=======")
        // console.log(hbsData, "get /");
        // console.log("=======")
        res.render("home", { user: hbsData, loggedIn: req.session.user ? true : false, username: req.session.user?.username })
    })
})
router.get("/login", (req, res) => {
    if (req.session.user) {
        res.redirect("/profile")
    }
    res.render("login")
})

router.get("/profile", (req, res) => {
    // console.log(req.session.user.id, "get profile")
    if (!req.session.user) {
        return res.redirect("/login")
    }
    User.findByPk(req.session.user.id, {
        include: [Favorite]
    }).then(userData => {
        // console.log(userData);
        
        const hbsData = userData.get({ plain: true })
        // console.log("=======")
        // console.log(hbsData);
        // hbsData.loggedIn = req.session.user ? true : false
        res.render("profile", { user: hbsData, loggedIn: req.session.user ? true : false, username: req.session.user?.username, title: hbsData.favorites.name, location: hbsData.favorites.location })
    })
})


router.get("/signup", (req, res) => {
    if (req.session.user) {
        return res.redirect("/profile")
    }
    res.render("signup");
})

router.post("/signup", (req, res) => {
    User.create(req.body).then(userData => {
        const hbsData = userData.map(userData => userData.get({ plain: true }))
        // console.log("=======")
        // console.log(hbsData);
        // console.log("=======")
        return res.render("profile", { user: hbsData, loggedIn: req.session.user?.loggedIn, username: req.session.user?.username })
    })
})

router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/")
})

module.exports = router;