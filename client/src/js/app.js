require.config({
    paths: {
        'views/header': 'views/header',
        'views/layout': 'views/layout',
        'views/sidebar': 'views/sidebar',

        'views/search': 'views/search',
        'views/collection': 'views/collection',

        'views/degree': 'views/degree',
        'views/course': 'views/course',
        'views/topic': 'views/topic',

        'models/degrees': 'models/degrees-collection',
        'models/courses': 'models/courses-collection',
        'models/topics': 'models/topics-collection',

        'react': 'libs/react-0.13.1',
        'react-bootstrap': 'libs/react-bootstrap-0.20.3',
        'hogan': 'libs/hogan-3.0.1',
        'ramda': 'libs/ramda-0.13.min',
        'jquery': 'libs/jquery-2.1.3',
        'underscore': 'libs/underscore-1.8.3',
        'backbone': 'libs/backbone-1.1.2',
        'backbone-react': 'libs/backbone-react-component-0.8.0',
        'three': 'libs/three-PATCHED-r71',
        'script/visjs': 'scripts/visjs',
        'vis': 'libs/vis.min'
    }
});

define([
    'backbone',
    'react',
    'react-bootstrap',
    'three',
    'ramda',
    'jquery',
    'views/header',
    'views/layout',
    'views/sidebar',
    'views/search',
    'views/collection',
    'views/degree',
    'views/course',
    'views/topic',
    'models/degrees',
    'models/courses',
    'models/topics',
    'vis',
    'script/visjs',
    'underscore'],
    function (Backbone, React, ReactBootstrap, Three, R, $, HeaderView, LayoutView, SidebarView, SearchView, CollectionView, DegreeView, CourseView, TopicView, DegreeCollection, CoursesCollection, TopicsCollection, vis, visDraw, _) {
    var degreesCollection = new DegreeCollection();
    var coursesCollection = new CoursesCollection();
    var topicsCollection = new TopicsCollection();

    var application = new Backbone.Model({
        sideBarVisible: true,

        userName: "myzone",

        stylesheets: ['css/style.css', 'css/bootstrap.css', 'css/simple-sidebar.css', 'css/vis.min.css'],
        appLogoUrl: 'resources/open-book-clipart.png',
        appName: 'Degree Overview',

        sessionCapabilities: [{
            name: "Profile",
            action: function (application) {
                application.set('activeFeature', application.get('features')['user-profile']);
            }
        }],

        features: {
            'degree-summary': {
                name: 'Degree Summary',
                content: React.createElement(React.createClass({
                    componentWillMount: function () {
                        degreesCollection.fetch({
                            reset: true,
                            wait: true
                        });
                    },
                    render: function () {
                        return React.createElement(CollectionView, {
                            key: 'search-result',
                            collection: degreesCollection,
                            view: DegreeView
                        })
                    }
                }), {key: 'course-search'})
            },
            'course-search': {
                name: 'Course Search',
                content: React.DOM.div({key: 'course-search'}, [
                    React.createElement(SearchView, {
                        key: 'search',
                        placeholder: 'Course name',
                        onSearch: function (query) {
                            var data = query
                                ? {search: query}
                                : {};

                            coursesCollection.fetch({
                                reset: true,
                                wait: true,
                                data: $.param(data)
                            });
                        }
                    }),
                    React.createElement(CollectionView, {
                        key: 'search-result',
                        collection: coursesCollection,
                        view: CourseView
                    })
                ])
            },
            'topic-search': {
                name: 'Topic Search',
                content: React.DOM.div({key: 'topic-search'}, [
                    React.createElement(SearchView, {
                        key: 'search',
                        placeholder: 'Topic name',
                        onSearch: function (query) {
                            var data = query
                                ? {search: query}
                                : {};

                            topicsCollection.fetch({
                                reset: true,
                                wait: true,
                                data: $.param(data)
                            });
                        }
                    }),
                    React.createElement(CollectionView, {
                        key: 'search-result',
                        collection: topicsCollection,
                        view: TopicView
                    })
                ])
            },
            'user-profile': {
                name: 'User Profile',
                content: React.DOM.h1({key: 'user-profile'}, 'User Profile'),
                hidden: true
            },
            '3d': {
                name: '3d',
                content: React.createElement(DegreeView, {model: {name: 'Software engineering', courses: [
                    {name: 'C++'}, {name:'Java'}, {name:"Web dev"}, {name:'Brainfuck'}, {name:'Not Only Brainfuck'}
                ]}})
            },
            '2d':{
                name: '2d',
                content: React.DOM.div({id: 'graph-content'})
            }
        },
        activeFeature: null
    });

    application.set('activeFeature', application.get('features')['2d']);

    var header = React.createElement(HeaderView, {
        key: 'header',
        model: application
    });
    var sidebar = React.createElement(SidebarView, {
        key: 'sidebar',
        model: application
    });
    var layout = React.createElement(LayoutView, {
        key: 'layout',
        header: header,
        sidebar: sidebar,
        model: application
    });

    React.render(layout, document.getElementById('root'));

    _.debounce(visDraw.draw(), 50);
});
