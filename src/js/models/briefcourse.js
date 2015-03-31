/**
 * This module defines the brief course schema
 * and data model.
 * Brief course is a child document of the degree document.
 * @sa degree.js
 */
var path = require('path');
var _ = require('underscore');

/**
 * Module factory function.
 */
module.exports = _.once( function (mongoose) {

    var BriefCourseSchema = new mongoose.Schema({
        name: String
    });

    /**
     * Export brief course schema and data model.
     */
    return {
        Schema: BriefCourseSchema,
        Model: mongoose.model(path.basename(module.filename, '.js'), BriefCourseSchema)
    };
} );
