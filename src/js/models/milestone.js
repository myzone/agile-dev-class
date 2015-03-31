/**
 * This module defines milestone schema and data model.
 */
var path = require('path');
var _ = require('underscore');

/**
 * Module factory function.
 */
module.exports = _.once( function (mongoose) {

    var MilestoneSchema = new mongoose.Schema({
        name: { type: String, required: true }
    });

    /**
     * Export milestone schema and data model
     */
    return {
        Schema: MilestoneSchema,
        Model: mongoose.model(path.basename(module.filename, '.js'), MilestoneSchema)
    };

} );
