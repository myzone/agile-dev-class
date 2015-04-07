/**
 * This module defines the topic schema and data model.
 */
var path = require('path');
var _ = require('underscore');

/**
 * Module factory function.
 */
module.exports = _.once( function (mongoose) {

    var TopicSchema = new mongoose.Schema({
        name: { type: String, required: true },
        description: { type: String, required: true }
    }, { collection: 'topics' });

    /**
     * Export topic schema and data model.
     */
    return {
        Schema: TopicSchema,
        Model: mongoose.model(path.basename(module.filename, '.js'), TopicSchema)
    };
} );
