const express = require('express');
const router = express.Router();
const {User, Favorite} = require('../../models')

const apiKey = "dyKoMIant5tA4GF_vX1UaxJLb-TfUwZYCtl0VRWMALgH7lh844ReqqLxQoEvbwuxVWa5L20BHtg0jFKVYo3dQ_TJbqUQuJ8DmB2oaj6ACsn8ctez8syWn2tAU7R6YnYx";

const yelp = require('yelp-fusion');
const client = yelp.client(apiKey);


// router.post('/', (req, res) => {
//     const businessArray = []
//     client.search({
//        term: 'pizza',
//        location: 'Seattle',
//    }).then(response => {
//        for (var i = 0; i < 3 ; i++) {
//            businessArray.push(
//                response.jsonBody.businesses[i]
//            )
//         }
//         return res.render("profile", businessArray)
//         // return res.json([termality, locality]);
//        // res.render("profile", 
//    }).catch(e => {
//        console.log(e);
//    });
// });

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

// router.get("/login",(req,res)=>{
//     // if(req.session.user){
//     //     return res.redirect("/profile")
//     // }
//     res.render("login")
// })