const express = require('express');
const router = express.Router();
const { Favorite, Restaurant } = require('../../models')
const mysql = require('mysql2')

const apiKey = "dyKoMIant5tA4GF_vX1UaxJLb-TfUwZYCtl0VRWMALgH7lh844ReqqLxQoEvbwuxVWa5L20BHtg0jFKVYo3dQ_TJbqUQuJ8DmB2oaj6ACsn8ctez8syWn2tAU7R6YnYx";
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: 'password',
        database: 'restaurant_db'
    },
    console.log(`Connected to the restaurant_db database.`)
);
const yelp = require('yelp-fusion');
const client = yelp.client(apiKey);
const businessArray = []

// router.get('/', async (req, res) => {
//     console.log("I'm here=================================")
//     db.query(`SELECT * FROM restaurant_db`, (err, rows) => {
//         if (err) {
//             return;
//         }
//         console.log(rows)
//         res.render('profile', businessArray)
//     })
// });

router.post('/', async (req, res) => {
    console.log("this is post route====================================")
    const yelpSearch = await client.search({
        term: req.body.busName,
        location: req.body.busLocal,
    })
    const restaurant = []
    for (var i = 0; i < Math.min(20, yelpSearch.jsonBody.businesses.length); i++) {
        businessArray.push(yelpSearch.jsonBody.businesses[i])
        console.log(yelpSearch.jsonBody.businesses[0].location)
        restaurant.push(
            {
                name: yelpSearch.jsonBody.businesses[i].name,
                location: yelpSearch.jsonBody.businesses[i].location.display_address.join(' '),
                phone: yelpSearch.jsonBody.businesses[i].display_phone,
                rating: yelpSearch.jsonBody.businesses[i].rating,
                isClose: yelpSearch.jsonBody.businesses[i].is_closed,
                imageURL: yelpSearch.jsonBody.businesses[i].image_url,
                userId: req.session.user.id,
            }
        )
    }
    console.log(restaurant)
    const bigSearch = await Restaurant.bulkCreate(restaurant)
    //console.log(bigSearch)
    res.json(bigSearch)
})


router.get("/favorites", (req, res) => {
    if (!req.session.user) {
        return res.redirect("/login")
    }
    Favorite.findByPk(req.session.user.id, {
        include: [Favorite]
    }).then(favoritesData => {
        console.log(favoritesData);
        const hbsData = favoritesData.get({ plain: true })
        console.log("=======")
        console.log(hbsData);
        hbsData.loggedIn = req.session.user ? true : false
        res.render("profile", hbsData)
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