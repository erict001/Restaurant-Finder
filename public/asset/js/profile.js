const search = document.querySelector("#search");
const apiKey = "dyKoMIant5tA4GF_vX1UaxJLb-TfUwZYCtl0VRWMALgH7lh844ReqqLxQoEvbwuxVWa5L20BHtg0jFKVYo3dQ_TJbqUQuJ8DmB2oaj6ACsn8ctez8syWn2tAU7R6YnYx";
const businessArray = []
// const yelp = require('yelp-fusion');
// const client = yelp.client(apiKey);


// search.addEventListener("submit", event => {
//     event.preventDefault();
//     var termality = document.getElementById("#name").value
//     var locality = document.getElementById("#local").value
//     console.log(termality, locality)
//     const businessArray = []
//     client.search({
//         term: termality,
//         location: locality,
//     }).then(response => {
//         for (var i = 0; i < 3; i++) {
//             businessArray.push(
//                 response.jsonBody.businesses[i]
//             )
//         }
//         console.log(businessArray)
        // return res.render("profile", { restaurant: businessArray, title: businessArray.name, location: businessArray.location })
//         // return res.json([termality, locality]);
//         // res.render("profile", 
//     }).catch(e => {
//         console.log(e);
//     });
// });
search.addEventListener("submit", event => {
    event.preventDefault();
    const userObj = {
        busName: document.querySelector("#name").value,
        busLocal: document.querySelector("#local").value,
    };
    console.log(userObj)
    fetch("/api/restaurants", {
        method: "POST",
        body: JSON.stringify(userObj),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        if (res.ok) {
            console.log(res)
            location.href = "/profile";
        } else {
            alert("Invalid login");
        }
    });
});

    // console.log(termality, locality)



