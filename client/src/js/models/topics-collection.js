define(['backbone', 'ramda'], function (Backbone, R) {
    return Backbone.Collection.extend({
        url: '/v1/topics'
    });
});