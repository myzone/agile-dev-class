//This module defines the course schema and data model.
//@sa topic.js
//@sa milestone.js

var _ = require('underscore');

module.exports = _.once(function() {

  var path = require('path');
  var mongoose = require('mongoose');

  var TopicSchema = require('./topic')().Schema;
  var MilestoneSchema = require('./milestone')().Schema;

  var CourseSchema = new mongoose.Schema({
    name: String,
	description: String,
    topics: [ TopicSchema ],
    milestones: [ MilestoneSchema ]
  }, { collection: 'courses' });

  return {
    Schema: CourseSchema,
    model: mongoose.model(path.basename(module.filename, '.js'), CourseSchema)
  };
});
