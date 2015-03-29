/**
 * 'Courses' resource request handler module.
 * This module provides getAll() function that allows client
 * to get all course records or perform search by course, topic
 * or milestone name.
 * Also, module provides getById() function.
 */

var mongoose = require('mongoose');
var db = require('../libs/db');

/**
 * Get all courses or perform search.
 * If req.query.search exists and not null, function will perform search by course name.
 * Query parameters req.query.inTopics and req.query.inMilestones determine whether
 * to perform search in topic names and/or milestone names or not.
 * Request from the frontend side looks like:
 * /v1/courses/
 * /v1/courses?search=data
 * /v1/courses?search=data&inTopics=true
 * /v1/courses?search=data&inTopics=true&inMilestones=true
 * @param req - request object
 * @param res - response object
 * @param next - next middleware function
 * @sa routes.js
 */
var getAll = function( req, res, next )
{
    var courseModel = db.model('course');
    var condition = {};
    if ( req.query.search )
    {
        condition = {
            $or:[
                { name: RegExp( '.*' + req.query.search + '.*', 'i' ) }
            ]
        };

        if ( req.query.inTopics )
        {
            condition.$or.push( { 'topics.name': RegExp( '.*' + req.query.search + '.*', 'i' ) } );
        }

        if ( req.query.inMilestones )
        {
            condition.$or.push( { 'milestones.name': RegExp( '.*' + req.query.search + '.*', 'i' ) } );
        }

    }
    courseModel.find( condition, function(err, data){
        if ( err )
        {
            next( err );
        }
        res.json( data );
    });
};

/**
 * Get course by ID.
 * req.params.id contains course ID.
 * Request from the frontend side looks like:
 * /v1/courses/55182222b8cc935013abaf56
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

    var courseModel = db.model('course');
    courseModel.findOne( {_id: id}, function (err, data) {
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