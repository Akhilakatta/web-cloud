/**
 * Created by karthik on 7/14/17.
 */
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var bodyParser = require("body-parser");
var express = require('express');
var cors = require('cors');
var app = express();

var url='mongodb://akhia:akhila@ds147668.mlab.com:47668/akhi';//1.Modify this url with the credentials of your db name and password.
var ObjectID = require('mongodb').ObjectID;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/create', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        insertDocument(db, req.body, function() {
            res.write("Successfully inserted");
            res.end();
        });
    });
});

app.get('/get', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }

        db.collection('books').find().toArray(function(err, result){
            if(err)
            {
                res.write("get Failed");
                res.end();
            }else
            {

                res.send(JSON.stringify(result));
            }
            console.log("Got All Documents");

        });
    });

});

app.get('/delete/:toBeDeleted_id', function (req, res) {
    // 2.Connect to MongoDB . Handle the error and write the logic for deleting the desired book
    var id = req.params.toBeDeleted_id;
    //console.log(req.params);
    MongoClient.connect(url, function(err, db) {
        //console.log(url);
        if(err)        {
            res.write("Failure");
            res.end();        }
        db.collection('books').deleteOne({"_id": ObjectID(id)}, function(err, result) {
            res.write("Item Deleted");
            res.end();
            console.log('Item deleted');
        });});
});


app.get('/update/:toBeUpdated_id', function (req, res) {
    //3.connect to MongoDB. Handle the error and write the logic for updating the selected field
    console.log(req.query);

    MongoClient.connect(url, function(err, db) {
        if(err)        {
            res.write("Connecting to Database Failed");
            res.end();        }

        var id=req.params.toBeUpdated_id;

        var myquery = {"_id":ObjectID(id)};

        var newvalues={"ISBN":req.query.ISBN, "authorName":req.query.authorName, "bookName":req.query.bookName};
        db.collection('books').updateOne(myquery, newvalues, function(err, result) {
            if(err)            {
                res.write("Failed");
                res.end();            }
            console.log("Updated Record");
        });
    });


    //var id=req.body.id2;

});


var insertDocument = function(db, data, callback) {
    db.collection('books').insertOne( data, function(err, result) {
        if(err)
        {
            res.write("Registration Failed, Error While Registering");
            res.end();
        }
        console.log("Inserted a document into the books collection.");
        callback();
    });
};

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)
});