const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection')
const bcrypt = require('bcrypt')

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false, 
        validate: {
            len:[8]
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    }
}, {
    hooks: {
        beforeCreate: async userdata => {
            userdata.password = await bcrypt.hash(userdata.password,5)
            return userdata
        }
    },
    sequelize,
    timestamps:false,
    freezeTableName:true,
    underscored:true,
    modelName:'user'
})

module.exports = User