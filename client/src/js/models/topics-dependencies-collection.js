define(['backbone', 'ramda'], function (Backbone, R) {
    return Backbone.Collection.extend({
        initialize: function(options) {
            this.id = options.id;
        },
        url: function(){
            return '/v1/topics/'+this.id+'/dependencies';
        }
    });
});