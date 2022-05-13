const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Restaurant extends Model {}

Restaurant.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    location: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    rating: {
        type: DataTypes.DECIMAL,
        allowNull:false,
    },
    isClose: {
        type: DataTypes.BOOLEAN,
        allowNull:false
    },
    imageURL: {
        type: DataTypes.TEXT,
        allowNull:false
    }
},{
    sequelize,
    timestamps:false,
    freezeTableName:true,
    underscored:true,
    modelName:'restaurant'
});

module.exports = Restaurant