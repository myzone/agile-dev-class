/**
 * This module defines degree schema and
 * data model.
 * @sa briefcourse.js
 */
var path = require('path');

/**
 * Module factory function.
 * @param mongoose - mongoose module instance.
 * @returns {{Schema: module.exports.Schema, Model: (*|Model)}}
 */
module.exports = function (mongoose) {

    var BriefCourseSchema = require('./briefcourse')(mongoose).Schema;

    var DegreeSchema = new mongoose.Schema({
        name: String,
        courses: [ BriefCourseSchema ]
    }, { collection: 'degrees' });

    /**
     * Export degree schema and data model.
     */
    return {
        Schema: DegreeSchema,
        Model: mongoose.model(path.basename(module.filename, '.js'), DegreeSchema)
    };
};
