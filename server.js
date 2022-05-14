const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');
const session = require("express-session");
const mysql = require('mysql2');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { engine } = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001;

const apiKey = process.env.YELP_API_KEY;

const yelp = require('yelp-fusion');
const client = yelp.client(apiKey);

const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {
      maxAge:1000*60*60*60
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
      db: sequelize
  })
};

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
