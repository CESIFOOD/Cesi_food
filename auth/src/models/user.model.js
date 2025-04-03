

const { DataTypes } = require("sequelize");
const sequelize = require("../../config/config");

const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "user",
    },
    refreshToken: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    timestamps: false
});

module.exports = User;
