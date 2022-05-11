const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');
const session = require("express-session");
const mysql = require('mysql2');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { engine } = require('express-handlebars');
const axios = require('axios').default;

const app = express();
const PORT = process.env.PORT || 3001;

const apiKey = "dyKoMIant5tA4GF_vX1UaxJLb-TfUwZYCtl0VRWMALgH7lh844ReqqLxQoEvbwuxVWa5L20BHtg0jFKVYo3dQ_TJbqUQuJ8DmB2oaj6ACsn8ctez8syWn2tAU7R6YnYx";

const yelp = require('yelp-fusion');
const client = yelp.client(apiKey);

const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {
      maxAge:1000*60*60*2
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
      db: sequelize
  })
};

app.get('/profile', (req, res) => {
  
  
  client.search({
    term: 'Four Barrel Coffee',
    location: 'san francisco, ca',
  }).then(response => {
    console.log(response.jsonBody.businesses[0].name);
  }).catch(e => {
    console.log(e);
  });

  // axios.get('https://api.yelp.com/v3/businesses/WavvLdfdP6g8aZTtbBQHTw')
  //   .then(function (response) {
  //     // handle success
  //     res.json(response.data);
  //   })
  //   .catch(function (error) {
  //     // handle error
  //     res.json(error);
  //   })
  //   .then(function () {
  //     // always executed
  //   });
})
// Make a request for a user with a given ID



app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// const hbs = exphbs.({extname: '.hbs', defaultLayout: "main"});
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});
