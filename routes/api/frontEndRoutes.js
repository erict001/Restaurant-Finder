const express = require('express');
const router = express.Router();
const {User, Favorite} = require('../models')

router.get('/', (req, res) => {
    if(req.session.user){
        Favorite.findAll().then(favoriteData); {
        return res.render('home', res.json(favoriteData))
    }}
    res.render("main", {favorites:loggedIn,username:req.session.user?.username})
})

router.get("/login",(req,res)=>{
    if(req.session.user){
        return res.redirect("/profile")
    }
    res.render("login")
})

router.get("/profile",(req,res)=>{
    if(!req.session.user){
        return res.redirect("/login")
    }
    User.findByPk(req.session.user.id,{
        include:[Favorite]
    }).then(userData=>{
        console.log(userData);
        const hbsData = userData.get({plain:true})
        console.log("=======")
        console.log(hbsData);
        hbsData.loggedIn = req.session.user?true:false
        res.render("profile",hbsData)
    })
})

module.exports = router;