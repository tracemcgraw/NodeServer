require('dotenv').config();//With this we ca make items in an .env file available to our whole application.
var express = require('express'); //we require the use of express npm package that we've installed in our dependencies
var app = express(); //we create an instance of express. We're actually firing off a top-level express() function, a function exported by the Express module. This allows us to create an Express app
var test = require('./controllers/testcontroller'); //We import the route onject that we just created and store it in a variable called test.
        //We call app.use and in the first parameter create a base url called /test . So our base url will look like this: http://localhost:3000/test
var authTest = require('./controllers/authtestcontroller');
var user = require('./controllers/usercontroller') // we import the usercontroller.js file       
var sequelize = require('./db');
// Create a sequelize variable that imports the db file
var bodyParser = require('body-parser');
//We pull the in the "body-parser" library and store it in the bodyParser variable
sequelize.sync();
// use the variable and call .sync() . This method will ensure that we sync all defined models to the DB.
app.use(bodyParser.json())
//This app.use statement MUST go above any routes. Any routes about this statment will not be able to us the bodyparser library.
//This tells the application that we want json to be used as we process a request. 
app.use(require('./middleware/headers')); //We activate our headers in th app.js. This is in order, so the file will be read sequentially, the headers must come before routes are declared.
app.use('/test', test) //The second parameter for the use() function, we pass in 'test'. This means that all routes created in the testcontroller.js file will be sub-routes. It will look like this: http://localhost/test or http://localhost:3000/test/
app.use('/api/user', user);//We set up a route to the endpoints for the api/user route.
// * Protected Routes
app.use(require('./middleware/validate-session')); //we imported the validate-session middleware, which will check to see if the incoming request has a token.
app.use('/authtest', authTest); //Anything beneath the validate-session will require a token to access, thus becoming protected.
//Anything above it will not require a token, remaining unprotected. Therefore, the test and user routes are not protected, while the authtest route is protected.

app.listen(3000, function(){ //app.listen will use express to start a UNIX socket and listen for connections on the given path. This method is identical to Node's http.Server.listen().
    console.log('App is listening on 3000!!'); // The given path is localhost: 3000. We call a callback function when the connection happens with a simple console.log
});

// app.use('/api/test', function(req, res){
//     res.send("This is data from the /api/test endpoint. It's from the Server.")
// });
