//This module defines milestone schema and data model.

var _ = require('underscore');

module.exports = _.once(function() {

  var path = require('path');
  var mongoose = require('mongoose');

  var MilestoneSchema = new mongoose.Schema({
    name: { type: String, required: true },
	description: String
  });

  return {
    Schema: MilestoneSchema,
    model: mongoose.model(path.basename(module.filename, '.js'), MilestoneSchema)
  };

});