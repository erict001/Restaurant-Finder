const express = require('express');
const router = express.Router();
const {User, Favorite} = require('../../models')

// router.get('/', (req, res) => {
//     if(req.session.user){
    //     Favorite.findAll().then(favoriteData=> {
    //         const hbsData = favoriteData.map(favoriteData => favoriteData.get({ plain: true }))
    //         console.log("=======")
    //         console.log(hbsData);
    //         console.log("=======")
    //         res.render("home", { favorites: hbsData, loggedIn: req.session.user?.loggedIn, username: req.session.user?.username })
    // })}
// })

router.get("/login",(req,res)=>{
    // if(req.session.user){
    //     return res.redirect("/profile")
    // }
    res.render("login")
})

router.get("/favorites",(req,res)=>{
    if(!req.session.user){
        return res.redirect("/login")
    }
    Favorite.findByPk(req.session.user.id,{
        include:[Favorite]
    }).then(favoritesData=>{
        console.log(favoritesData);
        const hbsData = favoritesData.get({plain:true})
        console.log("=======")
        console.log(hbsData);
        hbsData.loggedIn = req.session.user?true:false
        res.render("profile",hbsData)
    })
})

module.exports = router;