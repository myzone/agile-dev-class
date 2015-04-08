module.exports = function(app) {

  var mongoose = require('mongoose');
  var topicModel = require('../models/topic')().model;

  app.get('/v1/topics', function getAllCourses(req, res, next) {

    var condition = {};

    if (req.query.search) {
      condition = {
        name: RegExp('.*' + req.query.search + '.*', 'i')
      };
    }

    topicModel.find(condition, function onFindResult(err, data) {
      if (err) {
        next(err);
      }
      else {
        res.json(data);
        next();
      }
    });
  });

  app.get('/v1/topics/:id', function getDegreeById(req, res, next) {

    try {
      var id = mongoose.Types.ObjectId(req.params.id);
    }
    catch (e) {
      res.send(400);
      next(e);
      return;
    }

    topicModel.findOne({_id: id}, function onFindResult(err, data) {
      if (err) {
        next(err);
        return;
      }
      if (data) {
        res.json(data);
      } else {
        res.send(404);
      }
      next();
    });

  });

};

