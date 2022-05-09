const sequelize = require("../config/connection")
const {User,Favorite} = require("../models")

const users = [
    {
        username: "Interrubble",
        password: "password",
        email: "delagarzachris@icloud.com"
    },
    {
        username: "erict001",
        password: "password1",
        email: "erict001@gmail.com"
    },
    {
<<<<<<< HEAD
        username: "taychen",
        password: "password2",
        email: "taychen@gmail.com"
=======
        username: "tayshen",
        password: "password2",
        email: "tayshen@gmail.com"
>>>>>>> dev
    }
]

const favorites = [
    {
        name: "McDonalds",
        location: "Seattle, WA",
        favorites_id: "2"
    }
]

const loadUp = async ()=>{
    try{
        await sequelize.sync({force:true})
        await User.bulkCreate(users,{
            individualHooks:true
        });
        await Favorite.bulkCreate(favorites);
        process.exit(0);
    } catch(err){
        console.log(err)
    }
}

loadUp()