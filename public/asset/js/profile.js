const search = document.querySelector("#search");
const apiKey = "dyKoMIant5tA4GF_vX1UaxJLb-TfUwZYCtl0VRWMALgH7lh844ReqqLxQoEvbwuxVWa5L20BHtg0jFKVYo3dQ_TJbqUQuJ8DmB2oaj6ACsn8ctez8syWn2tAU7R6YnYx";

// const yelp = require('yelp-fusion');
// const client = yelp.client(apiKey);


search.addEventListener("submit", event => {
    event.preventDefault();
    
        // client.search({
        //     term: 'coffee',
        //     location: 'Seattle',
        // }).then(response => {
        //     console.log(response.jsonBody.businesses[0].name, "this is name");
        //     console.log(response.jsonBody.businesses[0].location, "this is local");
        // }).catch(e => {
        //     console.log(e);
        // });
    
    var termality = document.querySelector("#name").value
    var locality = document.querySelector("#local").value


    // console.log(termality, locality)
    
})



