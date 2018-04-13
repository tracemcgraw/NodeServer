//1 importing the sequelize package.
const Sequelize = require('sequelize');
//2 Create an instance of Sequelize for use in the module with the sequelize variable.
//3 Use the constructor to create a new Sequelize object.
//4 Identify the db table to connect to, is the "workout" parameter
//5 the username for the db, is the "postgre" parameter
//6 the password for the local db, is the "Letmein1234"

const sequelize = new Sequelize('workoutlog', 'postgres', 'Vegan123*',{
        //Is this an object??
        host: 'localhost', //7 The host points to the local port for Sequelize. This is 5432, FIND OUT WHERE THAT IS
        dialect : 'postgres' //8 identify the QL dialect being used. Could be MSSQL SQLLite, or Others. WHY POSTGRES
});
//9 Use the sequelize variable to access methods.
//10 Call the authenticate() method. What does authenticate() do??
//11 authenticate() returns a promise, this will make sure that our sequelize matches or else and error will occur. Use .then(). 
sequelize.authenticate().then(
    function(){ //12 Fire a function that shows if we're connected
        console.log("Connect to workoutlog postgres database");
        
    },
    function(err){ //13 Fire a error if there are any errors.
        console.log(err);
    }
);
//14 Export the module
module.exports = sequelize;