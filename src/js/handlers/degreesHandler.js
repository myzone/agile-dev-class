/**
 * 'Degrees' resource request handler module.
 * This module provides getAll() function that allows client
 * to get all degree records or perform search by degree or course
 * name.
 * Also, module provides getById() function.
 */

var mongoose = require('mongoose');
var db = require('../libs/db');

/**
 * Get all degrees or perform search.
 * If req.query.search exists and not null, function will perform search by degree name.
 * Query parameter req.query.inCourses determines whether
 * to perform search in course names or not.
 * Request from the frontend side looks like:
 * /v1/degrees/
 * /v1/degrees?search=data
 * /v1/degrees?search=data&inCourses=true
 * @param req - request object
 * @param res - response object
 * @param next - next middleware function
 * @sa routes.js
 */
var getAll = function( req, res, next )
{
    var degreeModel = db.model('degree');
    var condition = {};
    if ( req.query.search )
    {
        condition = {
            $or:[
                { name: RegExp( '.*' + req.query.search + '.*', 'i' ) }
            ]
        };

        if ( req.query.inCourses )
        {
            condition.$or.push( { 'courses.name': RegExp( '.*' + req.query.search + '.*', 'i' ) } );
        }

    }
    degreeModel.find( condition, function(err, data){
        if ( err )
        {
            next( err );
        }
        res.json( data );
    });
};

/**
 * Get degree by ID.
 * req.params.id contains degree ID.
 * Request from the frontend side looks like:
 * /v1/degrees/55182222b8cc935013abaf56
 * @param req - request object
 * @param res - response object
 * @param next - next middleware function
 * @sa routes.js
 */
var getById = function( req, res, next )
{
    try
    {
        var id = mongoose.Types.ObjectId(req.params.id)
    }
    catch (e)
    {
        res.send(400)
    }

    var degreeModel = db.model('degree');
    degreeModel.findOne( {_id: id}, function (err, data) {
        if (err) next(err);
        if (data) {
            res.json(data);
        } else {
            res.send(404);
        }
    });
};

/**
 * Export functions
 * @type {{getAll: Function, getById: Function}}
 */
module.exports = {
    getAll: getAll,
    getById: getById
};
