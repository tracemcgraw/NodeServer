// var express = require('express'); //1 import Express framework and it inside the var express. This becomes a gateway to using Express methods
// var router = express.Router(); //2 create a var router. Since express var gives us access into epress framework, we can access express properties and methods by calling express.Something. When we call express.Router() method will retrun router object for us.

// //3 we use router object by useing the router var to get access into the Router() object methods
// //4 get() is one of the methods in the object, and we call it here. This method allows us to complete an HTTP GET request. We pass to arguments into the .get method.
// //5 first argument is the path. In this case, the path is just a / . 
// //6 The second argument is a callback function. This is also sometimes called a "handler function". This function gets called when the application reveives a request to the specified route and HTTP method. The application "listens" for request that match the specified route(s) and method(s), and when it detects a match, it calls the specified call back function.

// router.get('/', function(req, res){
//     //7 Inside our callback function, we call res.send() . send() is an express method that can be called on the res or response object. Our response parameter is just a simple string.
//     res.send('Hey!!! This is a test route!')
// });
// //1. You can use the router instance that we've created and call get method form express to make a HTTP Get request.
// //2. The first parameter is the /about path tht we'll be appending to URL. This will make the url look like this: http://localhost:3000/test/about
// //3. Again, we pass in a callback function that will run when the path is requested. So when we type in the about url, this fuction fire off.
// //4. The send() method gets called on the res object, and a simple string is returned.
// router.get('/about', function(req, res){
//     res.send('This is an about route. Challenge 1 completed!!!!')
// });
// //Challenge 2 create three routes with messages of your choice.
// router.get('/contact', function(req, res){
//     var contact = {user: 'Trace', email: 'mcgraw.trace@gmail.com'};
//     res.send(contact)
// });
// router.get('/projects', function(req, res){
//     var projects = ["project 1" , "project 2"];
//     res.send(projects)
// });
// router.get('/array', function(req, res){
//     var person = [{name: 'Trace', age: 26},{name: 'Haley', age: 27}];
//     res.send(person)
// });
// //8 We export the module for usage outside of the file.
// module.exports = router;
var express = require('express')
var router = express.Router()
var sequelize = require('../db');
var TestModel = sequelize.import('../models/test');
// * Controller Method # 1: Simple Response

//1            //2
router.post('/one', function(req, res){
    //3
    res.send("Test 1 went through!")
});

// * Controller Method # 2: Persisting Data
router.post('/two', function(req, res){
    let testData = "Test data for endpoint two"; //2
    
    TestModel //3
        .create({ //4
            //6
            testdata: testData //5
        })
        res.send("Test two wet through!")
});

//* Controller Method # 3: req.body
router.post('/three', function(req, res){
                //1
    var testData = req.body.testdata.item;

    TestModel
    .create({   //2
        testdata: testData
    })
    res.send("Test three went through!")
    console.log("Test three went through!")
});

//* 4 Use this with Postman
router.post('/four', function(req, res){
    var testData = req.body.testdata.item;
    TestModel
        .create({
            testdata: testData
        })
        .then( //1
            function message(){ //2
                res.send("Test 4 went through!")
            }
        );
});

// * 5: Return data in a Promise.

router.post('/five', function(req, res){
    var testData = req.body.testdata.item;
    TestModel
    .create({
        testdata: testData
    })
    .then(
        function message(data){
            res.send(data);
        }
    );
});

//* Route 6: Return response as JSON

router.post('/six', function(req, res){
    var testData = req.body.testdata.item;
    TestModel
    .create({
        testdata: testData
    })
    .then(
        function message(testdata){
            res.json({ //1
                testdata: testdata //2
            });
        }
    );
});
 //* route 7: Handle errors

 router.post('/seven', function(req, res){
     var testData = req.body.testdata.item
     TestModel
     .create({
         testdata: testData
     })
     .then(
        function createSuccess(testdata){
            res.json({
                testdata: testdata
            });
        },
        function createError(err){ //1
            rs.send(500, err.message);
        }
    );
 });

//* GET: Get simple message form server
router.get('/helloclient', function(req, res){
    res.send('This is a message from the server to the client.')
});
// * GET: /one
router.get('/one', function(req, res) {

    TestModel
      .findAll({ //1
          attributes: ['id', 'testdata']
      })
      .then(
          function findAllSuccess(data) {
              console.log("Controller data:", data);
              res.json(data);
          },
          function findAllError(err) {
              res.send(500, err.message);
          }
      );
  });
module.exports = router;
// Controller Method # 1 
//1 We use the Express router object to call the post() method. This corresponds to the type of HTTP request that we are sending.
// POST is telling the server that the incoming request has data coming with it. You use a POST request when you sign up for an application,
// send an email, send a tweet, post on a wall, etc. POST sends data through HTTP to the server, which might send the data to the database to be stored.
// Why is HTTP Request important for this to router? HTTP request tell the server that this particular data is coming. From there the route will match up 
// and send data to controller, handling heavier logic. From there the controller sends data to the model to store the defined data. Controller will
// model will send its data back to a controller, and the controller will use sequelize .create to and new data to the table with new instances of the data form the model.
// From here is its sent back out to the controller to translate and respond to server.

//2 "/one" will be the endpoint/route we are using. Our route will be named http://localhost:3000/test/one . After that, we'll run a callback function,
// which will fire off a response.

//3  When the client requests the given endpoint, we simply send a string in our response.
//   Key point: We are sending a empty POST and returning a string response. We are not yet talking to our model or database.

//Flow Summary: 
//1. Make a POST request with Postman.
//2. The router sends that request to the restcontroller
//3. The testcontroller method fires off a callback with a response.
//4. The callback sends back the response to Postman.

// Controller Method # 2
//1. We import the test model and store it in TestModel cariable. It is cocention ut use Pascal casing for a model class with Sequelize.
//2. "testData" is going to have a fixed string that we'll use every time a POST request comes in.
//3. We use the TestModel variable to access the model that we are using. This will grant us access to the Test model properties and to Sequelize methods.
//4. .create() is a Sequelize method that allows us to create an instance of the Test model and send it off to the db, as long as the data types match the model.
//5. We pass the value of "TestData" down to satisfy the key/value paif for the model. This string that we are sending will be the value that's stored in the variable.
//   Currently, it is the string "Test data for endpoint two";
//6. testdata is the key in the object, and it represents the column being used in the table.

//Controller Method # 3
//1. Here we use the req.body middleware provided by Express and append two more properties to it. This is what we're sendind to the database. 
//   req is the actual request, and body is where our data is being held. testdata is a property of body , while item is a property of testdata. 
//   We'll see this in Postman in a little while.
//2. create() is a Sequelize method. It creates a SQL statement that will insert our data into the database. 

//STEP 4 - Use this with Postman
//1. We call the then() method. The then() method returns a Promise. Hence, we use this asynchronous function to force the message to wait for the insert
//   statement to finish.
//2. The callback function will print the success mesage to the console once testData is done running.

//STEP 5 - Return data in a Promise
//1. The .then() method is chained to .create() . 
//2. We have changed the data coming back in the response to the data that was persisted in Postgres. To be clear, agter the data is persisted in the Postgres
//   with the .create() method and in the testdata column, the .then() method returns a Promise that fires up a callback fucntion hodling the data that was added.
//* Important to note that the "data" parameter can hace any name that we wish.

//STEP 6 - Return resonse as JSON
//1. In our callback, rather than res.send() , we will invoke the .json() method. This will package our response as json.
//2. The same object that was added to the database is now being sent back to the client and stored in a testdata property.

//STEP 7 - Handles errors
//1. The addition that we've made here is an error function. If the create() function reutrs an erro, it will be picked up by the createError() method. 
//   That method will then send back a 500 error with a message.

// * GET: /one
//1. Notice that we find the attributes for two of the columns: id & testdata. This is part of sequelize.
//   If you are querying an entire table, you can choose which columns you want to grab from. 
//   The other columns will not be queried, which can save time for a giant table.

