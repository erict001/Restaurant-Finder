const User = require('./User')
const Favorite = require('./Favorites')

User.hasMany(Favorite);
Favorite.belongsTo(User)

module.exports = {
    User,
    Favorite
}