const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Favorite extends Model {}

Favorite.init({
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
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull:false,
        references: {
            model:'user',
            key:'id'
        }
    }
},{
    sequelize,
    timestamps:false,
    freezeTableName:true,
    underscored:true,
    modelName:'favorite'
});

module.exports = Favorite