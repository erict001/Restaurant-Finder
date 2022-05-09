const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./User');

class Favorite extends Model {}

Favorite.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    favorites_id: {
        type: DataTypes.INTEGER,
    }
},{
    sequelize
});

module.exports = Favorite