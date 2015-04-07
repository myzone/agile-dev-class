var mongoose = require('mongoose');
var db = require('../libs/db');

var getAll = function(req, res, next) {
    var topicModel = db.model('topic');
    var condition = {};
    if (req.query.search) {
        condition = {
            name: RegExp( '.*' + req.query.search + '.*', 'i' )
        };
    }
    topicModel.find(condition, function(err, data) {
        if (err) {
            next(err);
        }
        else {
            res.json(data);
        }
    });
};

var getById = function(req, res, next) {
    try {
        var id = mongoose.Types.ObjectId(req.params.id);
    }
    catch (e) {
        res.send(400);
        next();
        return;
    }

    var topicModel = db.model('topic');
    topicModel.findOne({_id: id}, function(err, data) {
        if (err) next(err);
        if (data) {
            res.json(data);
        } else {
            res.send(404);
        }
    });
};

module.exports = {
    getAll: getAll,
    getById: getById
};