const sequelize = require("../config/connection")
const {User,Favorite} = require("../models")

const users = require('./userData.json')
const favorites = require('./favoriteData.json')

const loadUp = async ()=>{
    try{
        await sequelize.sync({force:true})
        await User.bulkCreate(users,{
            individualHooks:true
        });
        await Favorite.bulkCreate(favorites,{
            individualHooks:true
        });
        process.exit(0);
    } catch(err){
        console.log(err)
    }
}

loadUp()