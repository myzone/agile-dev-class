var app = {
    Collections: {}
};
// we need to define model before the collection
var CourseModel = Backbone.Model.extend({
    initialize: function () {
        this.view = new CourseView({model: this});
    }
});

var TopicModel = Backbone.Model.extend({
    initialize: function () {
        this.view = new TopicView({model: this});
    }
});

var CourseView = Backbone.View.extend({
    template: _.template($('#course_view').html()),
    initialize: function () {
        this.setElement(this.template({course: this.model.toJSON()}));
    }
});

var TopicView = Backbone.View.extend({
    template: _.template($('#topic_view').html()),
    initialize: function () {
        this.setElement(this.template({topic: this.model.toJSON()}));
    }
});

var CoursesCollection = Backbone.Collection.extend({
    url: function () {
        return _.template('/v1/courses?search=<%= searchStr %>', {searchStr: this.searchStr});
    },
    model: CourseModel, //define class of models in collection
    initialize: function () {

        // by default show all courses
        this.searchStr = '';

        // set view of collection
        this.view = new CoursesListView({collection: this});

        // bind render of model on reset collection
        this.on('reset', this.view.render, this.view);

        // fetch data from url with reset
        this.fetch({reset: true});
    }
});


var TopicsCollection = Backbone.Collection.extend({
    url: function () {
        return _.template('/v1/topics/?search=<%= searchStr %>', {searchStr: this.searchStr});
    },
    model: TopicModel, //define class of models in collection
    initialize: function () {

        // by default show all courses
        this.searchStr = '';

        // set view of collection
        this.view = new TopicsListView({collection: this});

        // bind render of model on reset collection
        this.on('reset', this.view.render, this.view);

        // fetch data from url with reset
        this.fetch({reset: true});
    }
});


// view of collection
var CoursesListView = Backbone.View.extend({
    el: $('#content'), // DOM-element of widget'а

    events: {
        'click #search_courses_btn': 'searchCourses',
        'keydown #search_courses_input': 'searchCourses'
    },

    initialize: function () {
        this.$list = $('#list', this.$el); // set $list where will be rendered search results (inside $el)
    },

    render: function () {
        var self = this;
        this.$list.html('');
        if (this.collection.models.length == 0) {
            this.notFound();
        } else {
            _.each(this.collection.models, function (model) {
                self.$list.append(model.view.$el);
            });
        }
    },

    notFound: function () {
        this.$list.html('<h2>Нет результатов</h2>');
    },

    searchCourses: function (e) {
        if ((e.type === 'keydown' && e.keyCode === 13) || e.type === 'click') {
            var searchVal = $('#search_courses_input', this.$el).val();

            this.collection.searchStr = searchVal;
            this.collection.fetch({reset: true});
        }
    }
});
var TopicsListView = Backbone.View.extend({
    el: $('#content'), // DOM-element of widget'а

    events: {
        'click #search_courses_btn': 'searchCourses',
        'keydown #search_courses_input': 'searchCourses'
    },

    initialize: function () {
        this.$list = $('#list', this.$el); // set $list where will be rendered search results (inside $el)
    },

    render: function () {
        var self = this;
        this.$list.html('');
        if (this.collection.models.length == 0) {
            this.notFound();
        } else {
            _.each(this.collection.models, function (model) {
                self.$list.append(model.view.$el);
            });
        }
    },

    notFound: function () {
        this.$list.html('<h2>Нет результатов</h2>');
    },

    searchCourses: function (e) {
        if ((e.type === 'keydown' && e.keyCode === 13) || e.type === 'click') {
            var searchVal = $('#search_courses_input', this.$el).val();

            this.collection.searchStr = searchVal;
            this.collection.fetch({reset: true});
        }
    }
});

var Router = Backbone.Router.extend({

    routes: {
        '': 'index',
        'degree_summary': 'degree_summary',
        'course_search': 'course_search',
        'topic_search': 'topic_search'
    },

    initialize: function () {
        Backbone.history.start();
    },

    index: function () {
        // костыль пока (пока нет view у sidebar)
        //$('ul.sidebar-nav li a#a_f1').addClass('bg-primary').parent().siblings().find('a.bg-primary').removeClass('bg-primary');
        //if (app.Collections.courses_collection) {
        //    app.Collections.courses_collection.view.notFound(); // заглушка пока
        //}
    },

    degree_summary: function () {
        $('ul.sidebar-nav li a#a_ds').addClass('bg-primary').parent().siblings().find('a.bg-primary').removeClass('bg-primary');
        if (app.Collections.courses_collection) {
            app.Collections.courses_collection.view.notFound();
        }
    },

    course_search: function () {
        $('ul.sidebar-nav li a#a_cs').addClass('bg-primary').parent().siblings().find('a.bg-primary').removeClass('bg-primary');
        if (app.Collections.courses_collection) {
            app.Collections.courses_collection.fetch({reset: true});
        } else {
            app.Collections['courses_collection'] = new CoursesCollection();
        }
    },

    topic_search: function () {
        $('ul.sidebar-nav li a#a_ts').addClass('bg-primary').parent().siblings().find('a.bg-primary').removeClass('bg-primary');
        if (app.Collections.topics_collection) {
            app.Collections.topics_collection.fetch({reset: true});
        } else {
            app.Collections['topics_collection'] = new TopicsCollection();
        }
    }
});

app.router = new Router();

