var router = require('express').Router();
var sequelize = require('../db');
var User = sequelize.import('../models/user');
var AuthTestModel = sequelize.import('../models/authtest');

//GET all items for individual user

router.get('/getall', function (req, res){
    var userid = req.user.id;

    AuthTestModel
    .findAll({
        where: { owner: userid }
    })
    .then(
        function findAllSuccess(data){
            res.json(data);
        },
        function findAllError(err){
            res.send(500, err.message);
        }
    );
});

// POST single item for individual user

router.post('/create', function(req, res){
    var owner = req.user.id;
    var authTestData = req.body.authtestdata.item;

    AuthTestModel
        .create({
            authtestdata: authTestData,
            owner: owner
        })
        .then(
            function createSuccess(authtestdata){
                res.json({
                    authtestdata: authtestdata
                });
            },
            function createError(err){
                res.send(500, err.message);
            }
        );
});

router.get('/:id', function(req, res){
    var data = req.params.id;
    var userid = req.user.id;

    AuthTestModel
    .findOne({
        where: { id: data, owner: userid}
    }).then(
        function findOneSuccess(data){
            res.json(data);
        },
        function findOneError(err){
            res.send(500, err.message);
        }
    );
});

//Delete item for individual user
        //1                 //2
router.delete('/delete/:id', function(req, res){
    var data = req.params.id; //3
    var userid = req.user.id; //4

    AuthTestModel
    .destroy({ //5
        where: { id: data, owner: userid } //6
    }).then(
        function deleteLogSuccess(data){ //7
            res.send("you removed a log")
        },
        function deleteLogError(err){ //8
            res.send(500, err.message);
        }
    );
});

// * UPDATE item for individual user
      //1   //2
router.put('/update/:id', function(req, res){
    var data = req.params.id; //3
    var authtestdata = req.body.authtestdata.item; //4

    AuthTestModel
    .update({ //5
        authtestdata: authtestdata //6
    },
    {where: {id: data}} //7
).then(
    function updateSuccess(updatedLog){ //8
        res.json({
            authtestdata: authtestdata
        });
    },
    function updateError(err){ //9
        res.send(500, err.message);
    }
)
});
module.exports = router;

// * DELETE
//1.When a DELETE request is received, the controller looks for a matching function, like what the rest of the HTTP verbs do.
//2. We specify what we're doing in our endpoint to meake it easy for the use to know what's happening. The :id allows a parameter
//   to be passed through the URL to the sever so we can use it later.
//3. This is the parameter passed through the URL. The same way req.body points to the body of the request, req.params points to the URL.
//4. This is our userid , set when validate-session is called.
//5. .destroy() is a Sequelize method to remove an item form a database. 
//6. We tell Sequelize what to look for in tyring to find an item to delet. If nothing matches exactly, nothing is done.
//7. Callback function. This response is sent when the delete is successful.
//8. Callback function. This response is sent when the delet is unsuccessful.

// * UPDATE
//1. PUT is one of the HTTP verbs that has to be weird by not telling you what it does. 
//   PUT replaves whatever is aleready there with what we give it. In other words, PUT means update.
//2. To make it easier on the user, we use update in our route. We also allow a variable (id) to be passed through the URL again.
//3. The parameter taken from the URL.
//4. Our data we want to put into the database, replacing what already exists.
//5. update is a Sequelize method with takes two arguments.
//6. First argument of update . Contains a boject holding the new value we want to edit into the datbase.
//7. Second argument of update . Tells Sequelize where to plave the new data if a match is found.
//8. Callback function. Runs if update is successful, and returns the data entered. 
//9. allback function. Runs if update is not successful, and returns the reeor message.