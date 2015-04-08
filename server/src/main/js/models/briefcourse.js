//This module defines the brief course schema
//and data model.
//Brief course is a child document of the degree document.
//@sa degree.js

var _ = require('underscore');

module.exports = _.once(function() {

  var path = require('path');
  var mongoose = require('mongoose');

  var BriefCourseSchema = new mongoose.Schema({
    name: String
  });

  return {
    Schema: BriefCourseSchema,
    model: mongoose.model(path.basename(module.filename, '.js'), BriefCourseSchema)
  };

});
