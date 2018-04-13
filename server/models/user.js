module.exports = function (sequelize, DataTypes){
    //1                 //2
    return sequelize.define('user', {
        username: DataTypes.STRING, //3
        passwordhash: DataTypes.STRING //3
    });
};

//* Set up a new user model
//1. A function with a Sequelize object that calss the define method.
//2. A first parameter that will create a user table in Postgres.
//3. An object with usernae and passwordhash that will be the columns in the table.