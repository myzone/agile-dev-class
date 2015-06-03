module.exports = function(app) {

  var mongoose = require('mongoose');
  var degreeModel = require('../models/degree')().model;
  var dependencyModel = require('../models/dependency')().model;
  var _ = require('underscore');

  app.get('/v1/degrees', function getAllDegrees(req, res, next) {

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

  app.get('/v1/degrees/:id/dependencies', function getDependenciesInDegree(req, res, next) {

    try {
      var id = mongoose.Types.ObjectId(req.params.id);
    }
    catch (e) {
      res.send(400);
      next(e);
      return;
    }

    dependencyModel.find({degreeId: id}, function onFindResult(err, data) {
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

  app.get('/v1/degree_deps', function getDependenciesInDegree(req, res, next) {
    var query = degreeModel.find({}).limit(1);
    query.exec(function onFindDegree(err, data) {
      if (err) {
        res.send( "Degree fail" );
        next(err);
        return;
      }
      if (data) {
        dependencyModel.find({degreeId: data[0]._id}, function onFindResult(err, data) {
          if (err) {
            res.send( "Dependency fail" );
            next(err);
            return;
          }
          if (data) {
            var root = {
              name: "",
              children: {}
            };
            _.each( data, function(dependency) {
              if (root.children[dependency.dependent.courseId] === undefined)
              {
                root.children[dependency.dependent.courseId] = {};
                var child = root.children[dependency.dependent.courseId];
                child.key = dependency.dependent.courseId.toString();
                child.name = dependency.dependent.courseName;
              }

              if (root.children[dependency.dependent.courseId].imports === undefined) {
                root.children[dependency.dependent.courseId].imports = {};
              }

              root.children[dependency.dependent.courseId].imports[dependency.basic.courseId] = "";

              if (root.children[dependency.basic.courseId] === undefined) {
                root.children[dependency.basic.courseId] = {};
                var basic = root.children[dependency.basic.courseId];
                basic.key = dependency.basic.courseId.toString();
                basic.name = dependency.basic.courseName;
              }

              if (root.children[dependency.basic.courseId].imports === undefined) {
                root.children[dependency.basic.courseId].imports = {};
              }
            });
            root.children = _.values( root.children );
            _.each(root.children, function(child) {
              child.imports = _.keys( child.imports );
            });

            res.json(root);
          } else {
            res.send( "Dependency fail" );
          }
          next();
        });
      } else {
        res.send( "Degree fail" );
      }
      next();
    });
  });

};
