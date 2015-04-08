module.exports = function(app) {

  var mongoose = require('mongoose');
  var degreeModel = require('../models/degree')().model;

  app.get('/v1/degrees', function getAllCourses(req, res, next) {

    var condition = {};

    if (req.query.search) {
      condition = {
        $or: [
          { name: RegExp('.*' + req.query.search + '.*', 'i') }
        ]
      };

      if (req.query.inCourses) {
        condition.$or.push({
          'courses.name': RegExp( '.*' + req.query.search + '.*', 'i' )
        });
      }
    }

    degreeModel.find(condition, function onFindResult(err, data) {
      if (err) {
        next(err);
      }
      else {
        res.json(data);
        next();
      }
    });
  });

  app.get('/v1/degrees/:id', function getDegreeById(req, res, next) {

    try {
      var id = mongoose.Types.ObjectId(req.params.id);
    }
    catch (e) {
      res.send(400);
      next(e);
      return;
    }

    degreeModel.findOne({_id: id}, function onFindResult(err, data) {
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
