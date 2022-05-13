const User = require('./User')
const Favorite = require('./Favorite')
const Restaurant = require('./Restaurant')

User.hasMany(Favorite);
User.hasMany(Restaurant);
Favorite.belongsTo(User);

module.exports = {
    User,
    Favorite,
    Restaurant
}