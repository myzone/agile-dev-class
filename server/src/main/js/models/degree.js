//This module defines degree schema and
//data model.
//@sa briefcourse.js

var _ = require('underscore');

module.exports = _.once(function(mongoose) {

  var path = require('path');
  var mongoose = require('mongoose');

  var BriefCourseSchema = require('./briefcourse')().Schema;

  var DegreeSchema = new mongoose.Schema({
    name: String,
    courses: [ BriefCourseSchema ]
  }, { collection: 'degrees' });

  return {
    Schema: DegreeSchema,
    model: mongoose.model(path.basename(module.filename, '.js'), DegreeSchema)
  };
});
