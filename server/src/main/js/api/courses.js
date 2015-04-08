module.exports = function(app) {

  var mongoose = require('mongoose');
  var courseModel = require('../models/course')().model;

  app.get('/v1/courses', function getAllCourses(req, res, next) {

    var condition = {};

    if (req.query.search) {
      condition = {
        $or: [
          { name: RegExp('.*' + req.query.search + '.*', 'i') }
        ]
      };

      if (req.query.inTopics) {
        condition.$or.push({
          'topics.name': RegExp( '.*' + req.query.search + '.*', 'i' )
        });
      }

      if (req.query.inMilestones) {
        condition.$or.push({
          'milestones.name': RegExp('.*' + req.query.search + '.*', 'i')
        });
      }
    }

    courseModel.find(condition, function onFindResult(err, data) {
      if (err) {
        next(err);
      }
      else {
        res.json(data);
        next();
      }
    });
  });

  app.get('/v1/courses/:id', function getCourseById(req, res, next) {

    try {
      var id = mongoose.Types.ObjectId(req.params.id);
    }
    catch (e) {
      res.send(400);
      next(e);
      return;
    }

    courseModel.findOne({_id: id}, function onFindResult(err, data) {
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
