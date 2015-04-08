//This module defines the topic schema and data model.

var _ = require('underscore');

module.exports = _.once(function() {

  var path = require('path');
  var mongoose = require('mongoose');

  var TopicSchema = new mongoose.Schema({
    name: {
      type: String, required: true
    },
    description: {
      type: String, required: true
    }
  }, {
    collection: 'topics'
  });

  return {
    Schema: TopicSchema,
    model: mongoose.model(path.basename(module.filename, '.js'), TopicSchema)
  };
} );

