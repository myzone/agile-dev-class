var Features = {
    Dashboard: "Features::Dashboard",
    DegreeSummary: "Features::DegreeSummary",
    CourseSearch: "Features::CourseSearch",
    TopicSearch: "Features::TopicSearch"
};

var SideBarStatus = {
    Hidden: "SideBarStatus::Hidden",
    Shown: "SideBarStatus::Shown"
};

// App

var App = Backbone.Model.extend({
    defaults: {
        activeFeature: Features.Dashboard,
        sideBarStatus: SideBarStatus.Shown,
        router: null
    },
    initialize: function () {
        var self = this;

        self.router = new (Backbone.Router.extend({
            routes: {
                '': 'index',
                'degree-summary': function () {
                    self.set({activeFeature: Features.DegreeSummary});
                },
                'course-search': function () {
                    self.set({activeFeature: Features.CourseSearch});
                },
                'topic-search': function () {
                    self.set({activeFeature: Features.TopicSearch});
                }
            },
            initialize: function () {
                Backbone.history.start();
            }
        }))

    }
});

// SideBar

var SidebarModel = Backbone.Model.extend({
    defaults: {
        app: null
    }
});

var SidebarView = Backbone.View.extend({
    template: _.template($('#sidebar').html()),
    initialize: function () {
        var render = _.bind(this.render, this);

        this.model.on('change:app', function (event) {
            render();

            event.changed.app.on('all', render);
        });
    },
    render: function () {
        this.$el.html(this.template({
            sidebar: {
                activeFeature: this.model
                    .get('app')
                    .get('activeFeature')
            }
        }));

        return this.$el;
    }
});

// Content
var ContentModel = Backbone.Model.extend({
    defaults: {
        app: null,
        featureViews: {},
        activeView: null
    }
});

var ContentView = Backbone.View.extend({
    initialize: function () {
        var updateActiveView = _.bind(function () {
            return this.model.set({
                activeView: this.model.get('featureViews')[this.model
                    .get('app')
                    .get('activeFeature')]
            });
        }, this);
        var render = _.bind(this.render, this);

        this.model.on('change:app', function (event) {
            updateActiveView();

            event.changed.app.on('change:activeFeature', updateActiveView);
        });

        this.model.on('change:activeView', render);
    },
    render: function () {
        var activeView = this.model.get('activeView');

        return activeView
            ? activeView.render()
            : null;
    }
});

// Search

var SearchModel = Backbone.Model.extend({
    defaults: {
        inputId: '',
        buttonId: '',
        placeholder: '',
        resultId: '',
        onSearch: function (query) {
        },
        resultView: null
    }
});

var SearchView = Backbone.View.extend({
    template: _.template($('#search-view').html()),
    render: function () {
        var element = this.$el
        var inputId = this.model.get('inputId');
        var placeholder = this.model.get('placeholder');
        var buttonId = this.model.get('buttonId');
        var resultId = this.model.get('resultId');
        var onSearch = this.model.get('onSearch');
        var resultView = this.model.get('resultView');
        var searchVal = $('#' + inputId, this.$el).val();

        element.html(this.template({
            search: {
                inputId: inputId,
                placeholder: placeholder,
                buttonId: buttonId,
                resultId: resultId
            }
        }));

        $('#' + resultId, element).append(resultView.render())

        var search = function () {
            var searchVal = $('#' + inputId, element).val();

            onSearch(searchVal);
        };

        $('#' + inputId, element).val(searchVal);
        $('#' + buttonId, element).click(search);
        $('#' + inputId, element).keydown(function (e) {
            if (e.keyCode == 13) {
                search();
            }
        });

        return element;
    }
});


// Courses

var CourseModel = Backbone.Model.extend({
    initialize: function () {
        this.view = new CourseView({model: this});
    }
});

var CourseView = Backbone.View.extend({
    template: _.template($('#course-view').html()),
    initialize: function () {
        this.setElement(this.template({course: this.model.toJSON()}));
    }
});

var CoursesCollection = Backbone.Collection.extend({
    url: function () {
        return _.template('/v1/courses?search=<%= searchQuery %>', {searchQuery: this.searchQuery});
    },
    model: CourseModel, //define class of models in collection
    initialize: function () {
        // by default show all courses
        this.searchQuery = '';
    }
});

var CoursesListView = Backbone.View.extend({
    initialize: function () {
        this.$list = $('<div></div>');
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

        return this.$list;
    },

    notFound: function () {
        this.$list.html('<h2>No such courses ;(</h2>');
    }
});

// Topics

var TopicModel = Backbone.Model.extend({
    initialize: function () {
        this.view = new TopicView({model: this});
    }
});

var TopicView = Backbone.View.extend({
    template: _.template($('#topic-view').html()),
    initialize: function () {
        this.setElement(this.template({topic: this.model.toJSON()}));
    }
});

var TopicsCollection = Backbone.Collection.extend({
    url: function () {
        return _.template('/v1/topics?search=<%= searchQuery %>', {searchQuery: this.searchQuery});
    },
    model: TopicModel, //define class of models in collection
    initialize: function () {
        // by default show all courses
        this.searchQuery = '';
    }
});

var TopicsListView = Backbone.View.extend({
    initialize: function () {
        this.$list = $('<div></div>')
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

        return this.$list;
    },

    notFound: function () {
        this.$list.html('<h2>No such topics ;(</h2>');
    }
});

// Degree

var DegreeModel = Backbone.Model.extend({
    initialize: function () {
        this.view = new DegreeView({model: this});
    }
});

var DegreeView = Backbone.View.extend({
    template: _.template($('#degree-view').html()),
    initialize: function () {
        this.setElement(this.template({degree: this.model.toJSON()}));
    }
});

var DegreesCollection = Backbone.Collection.extend({
    url: function () {
        return '/v1/degrees';
    },
    model: DegreeModel
});

var DegreesListView = Backbone.View.extend({
    render: function () {
        var list = $('<div id="content">');

        _.each(this.collection.models, function (model) {
            list.append(model.view.$el);
        });

        this.$el.html(list.html());
        return this.$el;
    }
});

// main

var app = new App();
app.on('change:activeFeature', function (event) {
    console.log(event.changed.activeFeature)
});

var sidebarModel = new SidebarModel();
var sidebarView = new SidebarView({model: sidebarModel, el: $('#sidebar-wrapper')});

//
var coursesCollection = new CoursesCollection();
var coursesView = new CoursesListView({collection: coursesCollection});

var coursesSearchModel = new SearchModel({
    inputId: 'coursesSearch-input',
    buttonId: 'coursesSearch-button',
    resultId: 'coursesSearch-result',
    placeholder: 'Course name',
    resultView: coursesView,
    onSearch: function (query) {
        coursesCollection.searchQuery = query;
        coursesCollection.fetch({reset: true});
    }
});
var coursesSearchView = new SearchView({model: coursesSearchModel, el: $('#content')});
coursesCollection.on('reset', coursesSearchView.render, coursesSearchView);

//
var topicsCollection = new TopicsCollection();
var topicsView = new TopicsListView({collection: topicsCollection});

var topicsSearchModel = new SearchModel({
    inputId: 'topicsSearch-input',
    buttonId: 'topicsSearch-button',
    resultId: 'topicsSearch-result',
    placeholder: 'Topic name',
    resultView: topicsView,
    onSearch: function (query) {
        topicsCollection.searchQuery = query;
        topicsCollection.fetch({reset: true});
    }
});
var topicsSearchView = new SearchView({model: topicsSearchModel, el: $('#content')});
topicsCollection.on('reset', topicsSearchView.render, topicsSearchView);

//
var degreesCollection = new DegreesCollection();
var degreesView = new DegreesListView({collection: degreesCollection, el: $('#content')});
degreesCollection.on('reset', degreesView.render, degreesView);

var featureViews = {};
featureViews[Features.DegreeSummary] = degreesView;
featureViews[Features.CourseSearch] = coursesSearchView;
featureViews[Features.TopicSearch] = topicsSearchView;

var prefetches = {};
prefetches[Features.DegreeSummary] = function () {
    degreesCollection.fetch({reset: true})
};
prefetches[Features.CourseSearch] = function () {
    coursesCollection.fetch({reset: true})
};
prefetches[Features.TopicSearch] = function () {
    topicsCollection.fetch({reset: true})
};

var contentModel = new ContentModel({featureViews: featureViews});
var contentView = new ContentView({model: contentModel});

app.on('change:activeFeature', function (event) {
    var prefetch = prefetches[event.changed.activeFeature];

    if (prefetch)
        prefetch();
});


sidebarModel.set({app: app});
contentModel.set({app: app});

