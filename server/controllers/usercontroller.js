var express = require('express')
var router = express.Router()     //1.1
var sequelize = require('../db');
var User = sequelize.import('../models/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

//Create User Endpoints

//2
router.post('/createuser', function (req, res){

    var username = req.body.user.username;
    var pass = req.body.user.password;

    User.create({
        username: username,
        passwordhash: bcrypt.hashSync(pass, 10) //adding a hashSync() funciton to our new Use object so that we don't store the password in a format that is easy to read.           //1.3
    }).then(
        function createSuccess(user){
            //3.1             //3.2      //3.3        //3.4             //3.5
            var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
            res.json({
                user: user,
                message: 'created', //2.1
                sessionToken: token //3.6
            });
        },
        function createError(err){
            res.send(500, err.message);
        }
    );
});

// * Sign in Method
        //4.7
router.post('/signin', function(req, res){
            //4.1     //4.2     //4.3
    User.findOne({ where: {username: req.body.user.username }})
    //4.4
    .then(
        //4.5
        function(user){
            //5.1
            if(user){
                //5.2       //5.3                   //5.4                 //5.5
    bcrypt.compare(req.body.user.password, user.passwordhash, function (err, matches){
        //6.1
        if(matches){
            //6.2
            var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
                res.json({ //6.3
                    user: user,
                    message: "successfully authenticated",
                    sessionToken: token
                });
        }else{ //6.4
            res.status(500).send({error: "You failed, yo!"})
        }
        
    });
            }else{ //5.7
                res.status(500).send({error: "Failed to authenticate"}); //4.6
            }
        },
        function (err){
            res.status(501).send({error: "You failed, yo"});
        }
    );
});

module.exports = router;

// * usercontroller set up

//1.1 We bring in our necessary imports. Same as the tescontroller, just with a User model now.
//1.2 We start out our POST method for a createuser endpoint.
//1.3 Inside the method, we have the basics for creating a new user and returnig a message in the response.

// * Refactoring set up
//2.1 along with the user object that gets reutrned as JSON, we can send a message in the response.
//2.2 For the sake of time, well ask you to reread and review the flow of the above method. If you don't have an
//    understanding, you'll want to review the information in the testcontroller in the test/seve method. 
//    One big difference here is that we have two properties instead of one.

// * Token Creation
//3.1 Create a variable to hold the token.
//3.2 .sign() creates the token. It takes at least 2 parameters: the payload and the signature. 
//     You can also supply some specific options or a callback.
//3.3 This is the payload, or data we're sending. user.id is the primary key of the user table and is the number 
//    assigned to the user when created in the database.
//3.4 The system goes outside the current file to the .env file, where it looks for something calssed JWT_SECRET.
//    The value of the secret is stored in that enviroment variable.
//3.5 We set an option to make the token expire. Here, we're taking(seconds minutes hours); in other words, 1 day.
//3.6 We pass the value of the token back in our response. The server has now assigned a token to a specific user, and
//    the client will have that token to work with (once we have a client).

// * Sign in Method
//4.1. The find() method is a Sequelize method that does exactly what it says: it tries to find something within the database
//   that we tell it to look for. This is called Data Retrieval. 
//4.2. "where" is a object within Sequelize that tells the database to look for something matching its properties.
//4.3. We're looking in the "username" column in the user tables for one thing that matches the value passed from the client.
//4.4. The promise is handled within the .then() function
//4.5. Here we have a function that is called when the promise is resolved, and if successful, sends the "user" object back in
//   the response.
//4.6. Function called if the promise is rejected. We print the error to the console.
//4.7. We're sending data this time, so we use router.post instead of router.get .

// * Adding bcrypt.compare() to sign in with password
//5.1 First we check to make sure that a match for the username was found.
//5.2 Before, we used bcrypt to encrypt the password, Now, we use it to decrypt the hash value and compare it to the supplied password.
//    This is a complex task, and we let the highly reputable and revered bcrypt package handle the apgorithm for doing that. As a best practice,
//    you shouldn't try to write this or use something that you have written. First of all, it will take month of your lice to rebuild something 
//    that is already working. 
//5.3 Here we pull in the password value from the current request when the user is signing up.
//5.4 This pulss the hashed password value from the database.
//5.5 Run a callback function that will run on either success or failure of compare .
//5.6 If the hashed password in the database matches the one that has been entered, print to the console that the password values match. 
//    Note that the matches variable is a boolean.
//5.7 Handle situation where the match fails.

// * 6 Return a Token in respnse to our sign in request
//6.1 Here we use the callback function from the compare() method. If the username and password are a match, this will be set to true, 
//    and the expression in the conditional will execute.
//6.2 Upon success, we will create a new token for the session. Note that this code uses the same jwt.sign method that we used upon sign up. 
//    We will let you review that code if you need clarification. We are reffering to 3.2 - 3.6
//6.3 We return the use object with a success message and sessionToken.
//6.4 If the passswords don't match or the username is not correct, we send a response telling the cilent that authentication did not occur.