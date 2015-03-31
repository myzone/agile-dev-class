/**
 * This module defines the course schema and data model.
 * @sa topic.js
 * @sa milestone.js
 */
var path = require('path');

/**
 * Module factory function.
 * @param mongoose - mongoose module instance
 * @returns {{Schema: module.exports.Schema, Model: (*|Model)}}
 */
module.exports = function (mongoose) {

    /**
     * Course is a composite document that
     * contains array of a topic sub-documents and
     * array of a milestone sub-documents.
     */
    var TopicSchema = require('./topic')(mongoose).Schema;
    var MilestoneSchema = require('./milestone')(mongoose).Schema;

    var CourseSchema = new mongoose.Schema({
        name: String,
        topics: [ TopicSchema ],
        milestones: [ MilestoneSchema ]
    }, { collection: 'courses' });

    /**
     * Export course schema and data model.
     */
    return {
        Schema: CourseSchema,
        Model: mongoose.model(path.basename(module.filename, '.js'), CourseSchema)
    };
};
