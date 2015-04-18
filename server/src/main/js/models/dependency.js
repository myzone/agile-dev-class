//This module defines the dependency schema
//and data model.

var _ = require('underscore');

module.exports = _.once(function() {

  var path = require('path');
  var mongoose = require('mongoose');

  var DependencySchema = new mongoose.Schema({
    degreeId: mongoose.Schema.Types.ObjectId,
    basic: {
      courseId: mongoose.Schema.Types.ObjectId,
      courseName: String,
      topicId: mongoose.Schema.Types.ObjectId,
      topicName: String
    },
    dependent: {
      courseId: mongoose.Schema.Types.ObjectId,
      courseName: String,
      topicId: mongoose.Schema.Types.ObjectId,
      topicName: String
    }
  }, { collection: 'dependencies' });

  return {
    Schema: DependencySchema,
    model: mongoose.model(path.basename(module.filename, '.js'), DependencySchema)
  };

});
